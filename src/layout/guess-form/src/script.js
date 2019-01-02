export default {
	name: 'guess-form',
	props: ['hash'],
	data: function () {
		return {
			loading: false,
			guess: [],
			title: "",
			hideZero: false
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
		suma: function () {
			var sum = 100;

			this.guess.forEach(guess => {
				sum -= Number(guess.percentage);
			});

			return sum;
		},
		valid: function () {

			var isValid = true;

			if (this.suma != 0) isValid = false;

			this.guess.forEach(guess => {
				if (guess.percentage > 100) isValid =  false;
				if (guess.percentage < 0) isValid =  false;
			});

			if (this.title.length > 30) isValid =  false;

			return isValid;
		},
		coalition: function () {
			var o = {
				msg: "",
				members: [],
				percentage: 0
			};

			var coalitionAction = false;

			this.guess.forEach(guess => {
				if (guess.coalition === true) {
					o.members.push(guess.data);
					o.percentage += Number(guess.percentage);
				}
			});

			return o;
		}
	},
	methods: {
		handleClick_hideZero: function () {
			this.hideZero = !this.hideZero;
		},
		handleClick_submit: function () {
			var data = {
				title: this.title,
				region: this.region.ID_ZASTUPITELSTVO,
				hash: this.$store.state.votes.hash,
				values: [],
				coalition: []
			};

			this.guess.forEach(guess => {
				data.values.push(guess.data.ID + ":" + guess.percentage);
			});

			this.coalition.members.forEach(item => {
				data.coalition.push(item.ID);
			});

			data.values = data.values.join(",");
			data.coalition = data.coalition.join(",");

			data.onComplete = this.handleResponse_complete;
			data.onError = this.handleResponse_error;

			this.$store.dispatch("guess", data);
		},
		handleResponse_complete: function (guess) {
			this.$router.push("/misto/" + this.hash + "/odhad/" + guess);
		},
		handleResponse_error: function (message) {
			console.log(message);
		},
		calculate: function () {
			var current = 100 - this.suma;
			var highestValue = 0;
			var highest;

			this.guess.forEach(guess => {
				if (guess.percentage > highestValue) {
					highestValue = guess.percentage;
					highest = guess;
				}

				guess.percentage = Math.floor(guess.percentage / current * 100)
			});

			if (this.suma > 0) {
				highest.percentage += this.suma;
			}
		},
		sort: function (list) {
			return list.sort((a, b) => b.percentage - a.percentage);
		},
		sortByVotes: function () {
			this.guess = this.sort(this.guess);
		},
		newGuess: function () {
			this.guess = [];
			
			this.$store.state.programs.forEach(item => {
				this.guess.push({
					data: item,
					percentage: 0,
					coalition: false
				});
			});

		},
		ga: function (add_path, add_title) {
	
			var path = "misto/" + this.hash + "/novy-odhad";
			var title = this.name + " · " + "nový odhad výsledků";

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
						self.newGuess();
					} else {
						setTimeout (function () {
							self.ga();
							self.newGuess();
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

