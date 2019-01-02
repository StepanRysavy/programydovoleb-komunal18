export default {
	name: 'layout-detail-graph',
	props: ['hash', 'type'],
	data: function () {
		return {
			loading: false
		}
	},
	computed: {
		druh: function () {
			return this.$store.state.druhZastup.find(item => item.ID === this.region.DRUH_ZASTUP).NAME;
		},
		link: function () {
			return "https://komunal18.programydovoleb.cz/misto/" + this.region.HASH;
		},
		name: function () {
			return this.region.NAZEVZAST
		},
		area: function () {
			return this.$store.state.enum.find(item => item.NUMNUTS === this.region.ID_OKRES).NAZEVNUTS;
		},
		region: function () {
			return this.$store.state.selectedRegion.data;
		},
		votedInRegion: function () {

			if (this.$store.state.votes.data.length === 0) return false;

			if (this.$store.state.votes.data.find(item => item.OBVOD === this.region.OBVOD && item.TYP === 0)) return true;

			return false;
		},
		fetchedResults: function () {
			if (this.type === 'votes') {
				return this.sortByVotes(this.$store.state.programs, this.$store.state.selectedRegion.votes);
			}
			if (this.type === 'tips') {
				return this.sortByTips(this.$store.state.programs, this.$store.state.selectedRegion.tips);
			}
			return this.sortByVotes(this.$store.state.programs, this.$store.state.selectedRegion.results);
		},
		sortedResults: function () {
			return this.sort(this.fetchedResults);
		},
		results: function () {
			return this.sortedResults;
		}
	},
	methods: {
		sort: function (list) {
			return list.sort((a, b) => b.count - a.count);
		},
		sortByVotes: function (programs, results) {

			if (!programs || !results || results.length === 0) return [];

			var list = [];

			results.forEach(item => {
				list.push({
					data: this.$store.state.programs.find(program => program.ID === item.ID_KANDIDAT),
					count: item.COUNT,
					percentage: Math.round(item.COUNT / this.$store.state.selectedRegion.countVotes * 1000) / 10
				});
			});

			programs.forEach(item => {
				var program = list.find(listed => listed.data.ID === item.ID);

				if (!program) list.push({
					data: item,
					count: 0,
					percentage: 0
				});
			});

			return list; // list.sort((a, b) => this.votes(a).count > this.votes(b).count);
		},
		sortByTips: function (programs, results) {

			if (!programs || !results || results.length === 0) return [];

			var list = [];

			results.forEach(item => {
				list.push({
					data: this.$store.state.programs.find(program => program.ID === item.ID_KANDIDAT),
					count: item.COUNT,
					percentage: Math.round(item.COUNT / this.$store.state.selectedRegion.countTips * 1000) / 10
				});
			});

			programs.forEach(item => {
				var program = list.find(listed => listed.data.ID === item.ID);

				if (!program) list.push({
					data: item,
					count: 0,
					percentage: 0
				});
			});

			return list; // list.sort((a, b) => this.votes(a).count > this.votes(b).count);
		},
		sharebound: function () {
			this.ga("misto/" + this.hash + "/share/fb", this.region.NAZEVZAST + " sdílen na FB");
		},
		ga: function (add_path, add_title) {
	
			var path = "misto/" + this.hash + "/prubezne-vysledky-" + (this.type === "votes" ? "hlasovani" : "tipovani");
			var title = this.name + " · " + "průběžné výsledky " + (this.type === "votes" ? "hlasování" : "tipování");

			if (add_path) path = add_path;
			if (add_title) title = add_title;
			
    		this.$store.dispatch("ga", {path: path, title: title});
		},
		reloadMeta: function () {

			var self = this;

			if (this.form === true) this.closeForm();

			this.$store.dispatch("fetchDetail", {
				id: this.hash,
				onComplete: function () {

					if (self.$store.state.enum.length > 0) {
						self.ga();
					} else {
						setTimeout (function () {
							self.ga();
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

