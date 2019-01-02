export default {
	name: 'layout-candidates',
  data: function () {
    return {}
  },
	computed: {},
    methods: {
      ch: function (result) {
      	return result.charAt(0) === "C" && result.charAt(1) === "h";
      }
    },
    mounted: function () {
      window.scrollTo(0, 0);
      this.$store.dispatch("ga", {path: "kandidati", title: "Seznam všech kandidatů"});
    },
};

