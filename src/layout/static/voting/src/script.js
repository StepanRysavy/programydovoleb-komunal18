export default {
	name: 'layout-voting',
	data: function () {
		return {}
	},
	computed: {},
	components: {},
	methods: {
		load: function () {
	        this.$store.commit("modal", {
	          show: true,
	          vote: false,
	          load: (hash) => {
	          	this.$store.dispatch("setHash", hash);
	          }
	        });
		}
	},
	mounted: function () {
    	this.$store.dispatch("ga", {path: "hlasovani", title: "Nápověda k hlasování"});
		window.scrollTo(0, 0);
		
	}
};

