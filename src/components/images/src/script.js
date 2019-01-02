import Image from "@/components/image/do";

export default {
	name: 'list-of-images',
  props: ['list', 'columns'],
  components: {
    'image-detail': Image
  },
	computed: {},
  methods: {
    link: function (s) {
      return "https://komunal18.programydovoleb.cz/infografika/" + s;
    },
    outbound: function (type, image) {

      var path = "infografika/" + image.HASH + "/share/" + type;
      var title = "Infografika '" + image.TITLE + "' byla sdílena na " + type;

      root.$store.dispatch("ga", {path: path, title: title});
    }
  },
};

