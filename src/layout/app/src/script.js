import axios from "axios";
import VoteModal from "@/components/vote-modal/do";

axios.defaults.baseURL = 'https://komunal18.programydovoleb.cz/lib/app/api.php';
axios.interceptors.request.use(function (config) {

    if (config.url.indexOf("login.php") > -1) return config;

    var link = config.url.split(axios.defaults.baseURL);

    if (!config.params) config.params = {};

    config.params.url = link[1] || "";
    config.params.noCache = new Date().getTime();
    config.url = axios.defaults.baseURL;

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default {
	name: 'app',
    data: function () {
      return {
        search: ''
      }
    },
    components: {
      'vote-modal': VoteModal
    },
    computed: {
      searched: function () {
        return this.$store.state.search;
      },
      sorted: function () {

        // if (this.$store.state.results.length < 3) return this.$store.state.results;

        return this.$store.state.results; // this.sort(this.$store.state.results); // .filter(item => [1,2,3,5,6].indexOf(item.druh) > -1));
      },
      regions: function () {
        return []; // this.searched.length > 1 ? this.$store.state.enum.filter(item => item.PORADI === this.$store.state.poradi && item.OBVOD_NAZEV.toLowerCase().includes(this.searched.toLowerCase())) : [];
      }
    },
    methods: {
      sort: function (list) {
        return list.sort((a,b) => a.HASH.localeCompare(b.HASH, 'cs', {sensitivity: 'base'}));
      }
    },
    mounted: function () {
    },
    watch: {
      searched: function () {
        if (this.searched.length > 2 || this.searched.toLowerCase() === "aš") {
          this.$store.dispatch('search', this.searched.toLowerCase());
        } else {
          this.$store.dispatch('search', 'PLACEHOLDER');
        }
      }
    }
};

