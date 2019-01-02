import Images from "@/components/images/do";

export default {
	name: 'layout-homepage',
  components: {
    'list-of-images': Images
  },
	computed: {
    latestImages: function () {

      var list = this.$store.state.images.data.slice().reverse();

      return [list[0], list[1], list[2]];
    },
		list: function () {
			return this.sort(this.$store.state.enum.filter(item => item.PORADI === this.$store.state.poradi));
		},
    listPriority1: function () {
      var list = this.$store.state.listOfImportant.filter(item => Number(item.LIST) === 1);

      return list[0];
    },
    listPriority2: function () {
      var list = this.$store.state.listOfImportant.filter(item => Number(item.LIST) === 2);

      return this.sort(list);
    },
    listPriority3: function () {
      var list = this.$store.state.listOfImportant.filter(item => Number(item.LIST) === 3);

      return this.sort(list);
    }
	},
    methods: {
      sort: function (list) {
        return list.sort((a,b) => a.NAZEVZAST.localeCompare(b.NAZEVZAST, 'cs', {sensitivity: 'base'}));
      },
      ch: function (result) {
      	return result.charAt(0) === "C" && result.charAt(1) === "h";
      }
    },
    mounted: function () {
      
      window.scrollTo(0, 0);
      
      var root = this;

      if (this.$store.state.images.loaded === false) {
        this.$store.dispatch("fetchImages", {
          onComplete: function () {
            root.$store.dispatch("ga", {path: "", title: "Komunální volby 2018"});
          }
        });
      } else {
        root.$store.dispatch("ga", {path: "", title: "Komunální volby 2018"});
      } 
    }
};

