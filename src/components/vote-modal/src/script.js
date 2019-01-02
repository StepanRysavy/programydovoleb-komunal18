export default {
	name: 'vote-modal',
	props: [],
  data: function () {
    return {
      hash: '',
      type: 0,
      showCodeInput: false
    }
  },
	computed: {},
  methods: {
    close: function () {
      this.$store.commit("modal", {show: false});
    },
    generate: function () {
      this.type = 1;
      this.$store.state.votes.modal.generate();
      this.$store.dispatch("ga", {path: "hlasovani/generator", title: "Vygenerovaný noný hash"});
    },
    load: function () {
      this.type = 2;
      this.$store.state.votes.modal.load(this.hash);
      this.$store.dispatch("ga", {path: "hlasovani/prihlaseni", title: "Načtení výsledků z dřívějška"});
    },
    code: function () {
      this.showCodeInput = !this.showCodeInput;
    }
  },
  mounted: function () {}
};

