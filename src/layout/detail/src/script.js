import Vote from "@/components/vote/do";

function toUnicode(theString) {
  var unicodeString = '';
  for (var i=0; i < theString.length; i++) {
    var theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
    while (theUnicode.length < 4) {
      theUnicode = '0' + theUnicode;
    }
    theUnicode = '\\u' + theUnicode;
    unicodeString += theUnicode;
  }
  return unicodeString;
}

function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
          function (match) {
               return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
          });
}

export default {
	name: 'layout-detail',
	props: ['hash'],
	data: function () {
		return {
			details: false,
			loading: false,
			scrolled: 0,
			show1: false,
			show2: false
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
		programs: function () {
			return this.$store.state.programs;
		},
		programsSorted: function () {
			return this.sort(this.programs);
		},
		irozhlas: function () {
			return '<div id="widget-static-muni"></div><script src="https://d29fd2glrb0wdf.cloudfront.net/elections2018-municipal-ext.js"></script><script>var widgetStaticOverallMuni = irozhlas.renderComponent("WidgetStaticMunicipality", document.getElementById("widget-static-muni"), {data: {municipalityId: "554782",municipalityName: "Praha ",results: []}, settings:{showArticles:false, theme:"light"}});</script>';
		},
		representatives: function () {
			return this.$store.state.selectedRegion.listOfRepresentatives;
		}
	},
	components: {
		'vote-icon': Vote
	},
	methods: {
		code: function (str) {
			return unicodeToChar(str.split("u0").join("\\u0"));
		},
		toggle: function (id) {
			this["show" + id] = !this["show" + id];
		},
		sort: function (list) {
			return list.sort((a,b) => a.NAZEV.localeCompare(b.NAZEV, 'cs', {sensitivity: 'base'}));
		},
		guessItem: function (guess) {
			if (this.$store.state.selectedRegion.guess.length === 0) return undefined;

			return this.$store.state.selectedRegion.guess.find(item => item.HASH === guess);
		},
		guessList: function (guess) {

			if (guess.ODHAD.length === 0) return [];

			var list = guess.ODHAD.split(",");

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
		coalition: function (guess) {
			if (this.$store.state.selectedRegion.data.length === 0) return [{
				percentage: 0,
				members: []
			}];

			var list = (guess.KOALICE + "").split(",");
			var guessList = this.guessList(guess);
			var arr = {
				percentage: 0,
				members: []
			};

			list.forEach(item => {
				var member = this.programs.find(mem => mem.ID === Number(item));
				var guessValue = guessList.find(mem => mem.ID === Number(item));

				if (member && guess) {
					if (member.CODE != null) {
						arr.members.push(member.CODE);
					} else {
						arr.members.push(member.NAZEV);
					}
					
					arr.percentage += Number(guessValue.PCT);
				}
			});

			return arr;
		},
		votes: function (program) {
			if (this.$store.state.selectedRegion.votes) {
				var vote = this.$store.state.selectedRegion.votes.find(item => item.ID_KANDIDAT === program.ID);

				if (vote) {
					return {
						count: vote.COUNT,
						percentage: Math.round(vote.COUNT / this.$store.state.selectedRegion.countVotes * 1000) / 10
					}
				} else {
					return {
						count: 0,
						percentage: 0
					};
				}
			} else {
				return {
					count: -1,
					percentage: 0
				};
			}
		},
		tips: function (program) {
			if (this.$store.state.selectedRegion.tips) {
				var vote = this.$store.state.selectedRegion.tips.find(item => item.ID_KANDIDAT === program.ID);

				if (vote) {
					return {
						count: vote.COUNT,
						percentage: Math.round(vote.COUNT / this.$store.state.selectedRegion.countTips * 1000) / 10
					}
				} else {
					return {
						count: 0,
						percentage: 0
					};
				}
			} else {
				return {
					count: -1,
					percentage: 0
				};
			}
		},
		outbound: function (type, program) {
			this.ga("kandidat/" + program.ID + "/link/" + type, (program.CODE != null ? program.CODE : program.NAZEV) + " - " + type);
		},
		sharebound: function () {
			this.ga("misto/" + this.hash + "/share/fb", this.region.NAZEVZAST + " sdílen na FB");
		},
		people:function(program) {
			return "https://volby.cz/pls/kv2018/kv21111?xjazyk=CZ&xid=1&xv=12&xdz=" + this.region.DRUH_ZASTUP + "&xnumnuts=" + this.region.ID_OKRES + "&xobec=" + this.region.ID_ZASTUPITELSTVO + "&xstrana=" + program.ODKAZ_LISTINA;
		},
		ga: function (add_path, add_title) {
	
			var path = "misto/" + this.hash;
			var title = this.name;

			if (add_path) path = add_path;
			if (add_title) title = add_title;
			
    		this.$store.dispatch("ga", {path: path, title: title});

    		setTimeout(() => {
				window.irozhlas.renderComponent("WidgetStaticMunicipality", document.getElementById("widgetFromIRozhlas"), {data: {municipalityId: this.region.ID_ZASTUPITELSTVO, results: []}, settings:{showArticles:false, theme:"light"}});	
    		}, 2500);

		},
		reloadList: function () {

			if (this.representatives.META.UCAST === 0) {
				this.$store.dispatch("fetchListOfRepresentatives", {
					id: this.hash
				});
			}
		},
		reloadMeta: function () {

			var self = this;

			if (this.form === true) this.closeForm();

			this.$store.dispatch("fetchDetail", {
				id: this.hash,
				onComplete: function () {

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

		var script = document.createElement("script");
			script.src = 'https://d29fd2glrb0wdf.cloudfront.net/elections2018-municipal-ext.js';

		document.querySelector("body").appendChild(script);

		var scriptMunicipality;
		var scriptMunicipalityQuery = document.querySelectorAll("#scriptMunicipality");

		if (scriptMunicipalityQuery.length > 0) {
			scriptMunicipality = scriptMunicipalityQuery[0];
		} else {
			scriptMunicipality = document.createElement("script");
			scriptMunicipality.setAttribute("id", "scriptMunicipality");
			document.querySelector("body").appendChild(scriptMunicipality);
		}
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

