function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export default {
	name: 'vote',
	props: ['type', 'region', 'candidate', 'verbose', 'link'],
	computed: {
    typ: function () {
      if (this.type === "tip") return 0;
      if (this.type === "vote") return 1;
      return -1;
    },
    voted: function () {
      return this.$store.state.votes.data.find(item => item.TYP === this.typ && item.ID_KANDIDAT == this.candidate && item.ID_ZASTUP == this.region);
    },
    src: function () {
      return '/static/icon/' + this.type + (this.voted ? '-selected' : '') + '.svg';
    },
    srcHover: function () {
      return '/static/icon/' + this.type + '-selected.svg';
    },
    alt: function () {
      if (this.type === "tip") return this.voted ? "můj tip na vítěze" : "tipněte si, kdo bude senátorem v tomto obvodě";
      if (this.type === "vote") return this.voted ? "můj hlas" : "hlasujte nanečisto";
      return '';
    },
    label: function () {
      if (this.type === "tip") return this.voted ? "Můj tip" : "Tipnout";
      if (this.type === "vote") return this.voted ? "Můj hlas" : "Hlasovat";
      return '';
    }
  },
  methods: {

    voteProgress: function () {

      var root = this;

      this.$store.dispatch("vote", {
        hash: this.$store.state.votes.hash,
        type: this.typ,
        region: this.region,
        candidate: this.candidate,
        onComplete: function () {
          root.$store.dispatch("ga", {path: root.link + "/vote/" + root.type, title: "Hlasováno"});
        }
      });
    },

    voteGenerate: function () {

      var root = this;

      this.$store.dispatch("getHash", {
        onComplete: function (hash) {
          root.voteProgress();
        }
      });
    },

    voteLoad: function (hash) {

      var root = this;

      this.$store.dispatch("fetchVotes", {
        hash: hash,
        onComplete: function () {
          root.voteProgress();
        }
      });
    },

    vote: function () {

      if (this.voted) return;

      var root = this;

      if (this.$store.state.votes.hash != "") {
        this.voteProgress();
      } else {
        this.$store.commit("modal", {
          show: true,
          vote: true,
          type: this.type,
          load: this.voteLoad,
          generate: this.voteGenerate,
          candidate: this.$store.state.selectedProgram // this.$store.state.listOfCandidates.find(item => item.ID === this.candidate)
        });
      }
    }
  },
  mounted: function () {

    if (getCookie("vote_hash") === "") {
      // do nothing
    } else {
      this.$store.dispatch("setHash", getCookie("vote_hash"));
    }
  }
};

