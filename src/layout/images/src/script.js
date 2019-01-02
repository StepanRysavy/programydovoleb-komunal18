import Images from "@/components/images/do";

export default {
	name: 'layout-images',
  components: {
    'list-of-images': Images
  },
	computed: {
    reverse: function () {
      return this.$store.state.images.data.slice().reverse();
    }
  },
  methods: {
    link: function (s) {
      return "https://komunal18.programydovoleb.cz/infografika/" + s;
    },
    outbound: function (type, image) {

      var path = "infografika/" + image.HASH + "/share/" + type;
      var title = "Obrázek '" + image.TITLE + "' byl sdílen na " + type;

      root.$store.dispatch("ga", {path: path, title: title});
    }
  },
  mounted: function () {

    window.scrollTo(0, 0);

    var root = this;

    if (this.$store.state.images.loaded === false) {
      this.$store.dispatch("fetchImages", {
        onComplete: function () {
          root.$store.dispatch("ga", {path: "infografika", title: "Infografika"});
        }
      });
    } else {
      root.$store.dispatch("ga", {path: "infografika", title: "Infografika"});
    }
  },
};

