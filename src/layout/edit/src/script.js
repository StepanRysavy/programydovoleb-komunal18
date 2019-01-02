var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var value; 

export default {
	name: 'layout-edit',
	props: ['hash'],
	data: function () {
		return {
			www: '',
			fb: '',
			tw: '',
			heslo: ''
		}
	},
	computed: {
		name: function () {
			return this.region.NAZEVZAST
		},
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
	},
	methods: {
		disabled: function (content) {
			return !content.match(regex);
		},
		sendForm: function (type) {
			
			this.$store.dispatch("suggest", {
				id: this.program.ID,
				value: this[type],
				type: type
			});

			this[type] = '';

			this.$el.querySelector('.add-link-' + type).classList.add('sent');

			this.ga("form-send/" + type, "formulář odeslán: " + type);
		},
		ga: function (add_path, add_title) {
	
			var path = "kandidat/" + this.program.ID;
			var title = this.program.NAZEV;

			if (add_path) path = path + "/" + add_path;
			if (add_title) title = title + " - " + add_title;
			
    		this.$store.dispatch("ga", {path: path, title: title});
		},
		reloadMeta: function () {

			var self = this;

			this.$store.dispatch("fetchDetailPriority", {
				id: this.hash,
				onComplete: function () {

					if (self.$store.state.enum.length > 0) {
						self.ga("form-open/", "formulář otevřen");
					} else {
						setTimeout (function () {
							self.ga("form-open/", "formulář otevřen");
						}, 1000);
					}
				}
			});
		}
	},
	mounted: function () {
		this.reloadMeta();
		window.scrollTo(0, 0);
		
	}
};

