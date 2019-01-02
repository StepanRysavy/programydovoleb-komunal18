import Images from "@/components/images/do";

var root;

export default {
	name: 'layout-image',
	props: ['hash'],
	components: {
		'list-of-images': Images
	},
	computed: {
		image: function () {
			return this.$store.state.images.data.find(item => item.HASH === this.hash)
		},
		next: function () {
			if (this.$store.state.images.data.length < 3) return null;

			var id = this.$store.state.images.data.indexOf(this.image) + 1;

			if (id === this.$store.state.images.data.length) id = 0;

			return this.$store.state.images.data[id];
		},
		previous: function () {
			if (this.$store.state.images.data.length < 3) return null;

			var id = this.$store.state.images.data.indexOf(this.image) - 1;

			if (id === -1) id = this.$store.state.images.data.length - 1;

			return this.$store.state.images.data[id];
		},
		nearImages: function () {
			return [this.previous, this.next];
		}
	},
  methods: {
    link: function (s) {
      return "https://komunal18.programydovoleb.cz/infografika/" + s;
    },
    outbound: function (type, image) {

      var path = "infografika/" + image.HASH + "/share/" + type;
      var title = "Infografika '" + image.TITLE + "' byla sdílena na " + type;

      root.$store.dispatch("ga", {path: path, title: title});
    },
    mount: function () {
	    window.scrollTo(0, 0);
	    
	    root = this;

	    if (this.$store.state.images.loaded === false) {
			this.$store.dispatch("fetchImages", {
		      onComplete: function () {
		        root.$store.dispatch("ga", {path: "infografika/" + root.image.HASH, title: "Infografika '" + root.image.TITLE + "'"});
		      }
		    });
	    } else {
	    	root.$store.dispatch("ga", {path: "infografika/" + root.image.HASH, title: "Infografika '" + root.image.TITLE + "'"});
	    } 
    }
  },
  mounted: function () {
  	this.mount();
  },
  watch: {
  	hash: function () {
  		this.mount();
  	}
  }
};

