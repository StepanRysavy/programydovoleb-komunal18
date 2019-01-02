export default {
	name: 'layout-cookies',
	data: function () {
		return {}
	},
	computed: {},
	components: {},
	methods: {},
	mounted: function () {
    	this.$store.dispatch("ga", {path: "cookies", title: "Cookies"});
		window.scrollTo(0, 0);
		
	}
};

