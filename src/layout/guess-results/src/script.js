export default {
	name: 'guess-results',
	props: ['hash', 'guess'],
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
			return "https://komunal18.programydovoleb.cz/misto/" + this.region.HASH + "/odhad/" + this.guess;
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
		guessItem: function () {

			if (this.$store.state.selectedRegion.guess.length === 0) return undefined;

			return this.$store.state.selectedRegion.guess.find(item => item.HASH === this.guess);
		},
		guessList: function () {

			if (!this.guessItem) return [];

			if (this.guessItem.ODHAD.length === 0) return [];

			var list = this.guessItem.ODHAD.split(",");

			var arr = [];

			list.forEach(item => {
				var splitted = item.split(":");

				arr.push({
					ID: Number(splitted[0]),
					PCT: Number(splitted[1])
				})
			});

			return arr;
		},
		fetchedResults: function () {
			return this.sortByVotes(this.$store.state.programs, this.guessList);
		},
		sortedResults: function () {
			return this.sort(this.fetchedResults);
		},
		results: function () {
			return this.sortedResults;
		},
		coalition: function () {
			if (!this.guessItem) return [{
				percentage: 0,
				members: []
			}];
			
			var list = (this.guessItem.KOALICE + "").split(",");
			var arr = {
				percentage: 0,
				members: []
			};

			list.forEach(item => {
				var member = this.results.find(mem => mem.data.ID === Number(item));
				var guess = this.guessList.find(mem => mem.ID === Number(item));

				if (member && guess) {
					arr.members.push(member.data.NAZEV);
					arr.percentage += Number(guess.PCT);
				}
			});

			return arr;
		}
	},
	methods: {
		sort: function (list) {
			return list.sort((a, b) => b.percentage - a.percentage);
		},
		inCoalition: function (program) {

			var is = false;

			this.coalition.members.forEach(member => {
				if (member === program.data.NAZEV) {
					is = true;
				} 
			});

			return is;
		},
		sortByVotes: function (programs, results) {

			if (!programs || !results || results.length === 0) return [];

			var list = [];

			programs.forEach(item => {
				list.push({
					data: item,
					percentage: (this.guessList.find(guess => guess.ID === item.ID) || {PCT: 0}).PCT
				});
			});

			return list; // list.sort((a, b) => this.votes(a).count > this.votes(b).count);
		},
		outbound: function (type) {
			this.ga("misto/" + this.hash + "/odhad/" + this.guess + "/share/" + type, this.region.NAZEVZAST + " odhad výsledků sdílen na " + type);
		},
		ga: function (add_path, add_title) {
	
			var path = "misto/" + this.hash + "/odhad/" + this.guess;
			var title = this.name + " · " + "odhad výsledků " + this.guess;

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

