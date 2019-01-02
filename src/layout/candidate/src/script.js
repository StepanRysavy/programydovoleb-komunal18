import Vote from "@/components/vote/do";

export default {
	name: 'layout-candidate',
	props: ['hash'],
	data: function () {
		return {
			loading: false,
			scrolled: 0,
			show1: false,
			show2: false
		}
	},
	computed: {
		program: function () {
			return this.$store.state.selectedProgram
		},
		area: function () {
			return this.$store.state.enum.find(item => item.NUMNUTS === this.region.ID_OKRES).NAZEVNUTS;
		},
		region: function () {
			return this.$store.state.selectedRegion.data;
		},
		id: function () {
			return this.program.ID;
		}
	},
	components: {
		'vote-icon': Vote
	},
	methods: {
		toggle: function (id) {
			this["show" + id] = !this["show" + id];
		},
		outbound: function (type, program) {
			this.ga("link/" + type, type);
		},
		ga: function (add_path, add_title) {
	
			var path = "kandidat/" + this.program.ID;
			var title = this.program.NAZEV + " — " + this.region.NAZEVZAST;

			if (add_path) path = path + "/" + add_path;
			if (add_title) title = title + " - " + add_title;
			
    		this.$store.dispatch("ga", {path: path, title: title});
		},
		people:function(program) {
			return "https://volby.cz/pls/kv2018/kv21111?xjazyk=CZ&xid=1&xv=12&xdz=" + this.region.DRUH_ZASTUP + "&xnumnuts=" + this.region.ID_OKRES + "&xobec=" + this.region.ID_ZASTUPITELSTVO + "&xstrana=" + program.ODKAZ_LISTINA;
		},
		reloadList: function () {

			if (this.program.KANDIDATI === "") {
				this.$store.dispatch("fetchListOfCandidates", {
					id: this.hash
				});
			}
		},
		reloadMeta: function () {

			var self = this;

			self.loading = true;

			if (this.form === true) this.closeForm();

			this.$store.dispatch("fetchDetailPriority", {
				id: this.hash,
				onComplete: function () {

					self.loading = false;

					if (self.$store.state.enum.length > 0) {
						self.ga();
						self.reloadList();
					} else {
						setTimeout (function () {
							self.ga();
							self.reloadList();
						}, 1000);
					}
				}
			});
			this.$store.commit("clearSearch");
		},
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
		this.reloadMeta();
		window.scrollTo(0, 0);

		var body = document.querySelector("body");
		var root = this;

		window.addEventListener("scroll", function (ev) {
			root.scrolled = window.pageYOffset;
		});
		
	},
	updated: function () {
		// this.$store.dispatch("fetchDetail", Number(this.id));
	},
	watch:  {
		hash: function () {
			this.reloadMeta();
		}
	}
};

