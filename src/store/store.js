import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const LIST_IMPORTANT = '{"data":[{"HASH":"554782-praha-hl-m-", "NAZEVZAST": "Praha", "LIST": 1}, {"HASH":"582786-brno", "NAZEVZAST": "Brno", "LIST": 2},{"HASH":"554821-ostrava", "NAZEVZAST": "Ostrava", "LIST": 2},{"HASH":"554791-plzen", "NAZEVZAST": "Plzeň", "LIST": 2},{"HASH":"563889-liberec", "NAZEVZAST": "Liberec", "LIST": 2},{"HASH":"500496-olomouc", "NAZEVZAST": "Olomouc", "LIST": 2},{"HASH":"554804-usti-nad-labem", "NAZEVZAST": "Ústí nad Labem", "LIST": 2},{"HASH":"569810-hradec-kralove", "NAZEVZAST": "Hradec Králové", "LIST": 2},{"HASH":"544256-ceske-budejovice", "NAZEVZAST": "České Budějovice", "LIST": 2},{"HASH":"555134-pardubice", "NAZEVZAST": "Pardubice", "LIST": 2},{"HASH":"555088-havirov", "NAZEVZAST": "Havířov", "LIST": 3}, {"HASH":"585068-zlin", "NAZEVZAST": "Zlín", "LIST": 2},{"HASH":"532053-kladno", "NAZEVZAST": "Kladno", "LIST": 3},{"HASH":"567027-most", "NAZEVZAST": "Most", "LIST": 3},{"HASH":"598917-karvina", "NAZEVZAST": "Karviná", "LIST": 3},{"HASH":"505927-opava", "NAZEVZAST": "Opava", "LIST": 3},{"HASH":"598003-frydek-mistek", "NAZEVZAST": "Frýdek-Místek", "LIST": 3},{"HASH":"554961-karlovy-vary", "NAZEVZAST": "Karlovy Vary", "LIST": 2},{"HASH":"586846-jihlava", "NAZEVZAST": "Jihlava", "LIST": 2},{"HASH":"567442-teplice", "NAZEVZAST": "Teplice", "LIST": 3},{"HASH":"562335-decin", "NAZEVZAST": "Děčín", "LIST": 3}, {"HASH":"562971-chomutov", "NAZEVZAST": "Chomutov", "LIST": 3},{"HASH":"511382-prerov", "NAZEVZAST": "Přerov", "LIST": 3},{"HASH":"563510-jablonec-nad-nisou", "NAZEVZAST": "Jablonec nad Nisou", "LIST": 3},{"HASH":"535419-mlada-boleslav", "NAZEVZAST": "Mladá Boleslav", "LIST": 3},{"HASH":"589250-prostejov", "NAZEVZAST": "Prostějov", "LIST": 3},{"HASH":"590266-trebic", "NAZEVZAST": "Třebíč", "LIST": 3},{"HASH":"598810-trinec", "NAZEVZAST": "Třinec", "LIST": 3},{"HASH":"561380-ceska-lipa", "NAZEVZAST": "Česká Lípa", "LIST": 3},{"HASH":"552046-tabor", "NAZEVZAST": "Tábor", "LIST": 3}]}';
const LIST_REGIONS = '{"data":[{"ID":1,"HASH":"1-ceska-republika","NAZEVNUTS":"\u010cesk\u00e1 republika","NUMNUTS":0},{"ID":2,"HASH":"2-praha","NAZEVNUTS":"Praha","NUMNUTS":1000},{"ID":3,"HASH":"3-hlavni-mesto-praha","NAZEVNUTS":"Hlavn\u00ed m\u011bsto Praha","NUMNUTS":1100},{"ID":4,"HASH":"4-praha","NAZEVNUTS":"Praha","NUMNUTS":1199},{"ID":5,"HASH":"5-stredni-cechy","NAZEVNUTS":"St\u0159edn\u00ed \u010cechy","NUMNUTS":2000},{"ID":6,"HASH":"6-stredocesky-kraj","NAZEVNUTS":"St\u0159edo\u010desk\u00fd kraj","NUMNUTS":2100},{"ID":7,"HASH":"7-benesov","NAZEVNUTS":"Bene\u0161ov","NUMNUTS":2101},{"ID":8,"HASH":"8-beroun","NAZEVNUTS":"Beroun","NUMNUTS":2102},{"ID":9,"HASH":"9-kladno","NAZEVNUTS":"Kladno","NUMNUTS":2103},{"ID":10,"HASH":"10-kolin","NAZEVNUTS":"Kol\u00edn","NUMNUTS":2104},{"ID":11,"HASH":"11-kutna-hora","NAZEVNUTS":"Kutn\u00e1 Hora","NUMNUTS":2105},{"ID":12,"HASH":"12-melnik","NAZEVNUTS":"M\u011bln\u00edk","NUMNUTS":2106},{"ID":13,"HASH":"13-mlada-boleslav","NAZEVNUTS":"Mlad\u00e1 Boleslav","NUMNUTS":2107},{"ID":14,"HASH":"14-nymburk","NAZEVNUTS":"Nymburk","NUMNUTS":2108},{"ID":15,"HASH":"15-praha-vychod","NAZEVNUTS":"Praha-v\u00fdchod","NUMNUTS":2109},{"ID":16,"HASH":"16-praha-zapad","NAZEVNUTS":"Praha-z\u00e1pad","NUMNUTS":2110},{"ID":17,"HASH":"17-pribram","NAZEVNUTS":"P\u0159\u00edbram","NUMNUTS":2111},{"ID":18,"HASH":"18-rakovnik","NAZEVNUTS":"Rakovn\u00edk","NUMNUTS":2112},{"ID":19,"HASH":"19-jihozapad","NAZEVNUTS":"Jihoz\u00e1pad","NUMNUTS":3000},{"ID":20,"HASH":"20-jihocesky-kraj","NAZEVNUTS":"Jiho\u010desk\u00fd kraj","NUMNUTS":3100},{"ID":21,"HASH":"21-ceske-budejovice","NAZEVNUTS":"\u010cesk\u00e9 Bud\u011bjovice","NUMNUTS":3101},{"ID":22,"HASH":"22-cesky-krumlov","NAZEVNUTS":"\u010cesk\u00fd Krumlov","NUMNUTS":3102},{"ID":23,"HASH":"23-jindrichuv-hradec","NAZEVNUTS":"Jind\u0159ich\u016fv Hradec","NUMNUTS":3103},{"ID":24,"HASH":"24-pisek","NAZEVNUTS":"P\u00edsek","NUMNUTS":3104},{"ID":25,"HASH":"25-prachatice","NAZEVNUTS":"Prachatice","NUMNUTS":3105},{"ID":26,"HASH":"26-strakonice","NAZEVNUTS":"Strakonice","NUMNUTS":3106},{"ID":27,"HASH":"27-tabor","NAZEVNUTS":"T\u00e1bor","NUMNUTS":3107},{"ID":28,"HASH":"28-plzensky-kraj","NAZEVNUTS":"Plze\u0148sk\u00fd kraj","NUMNUTS":3200},{"ID":29,"HASH":"29-domazlice","NAZEVNUTS":"Doma\u017elice","NUMNUTS":3201},{"ID":30,"HASH":"30-klatovy","NAZEVNUTS":"Klatovy","NUMNUTS":3202},{"ID":31,"HASH":"31-plzen-mesto","NAZEVNUTS":"Plze\u0148-m\u011bsto","NUMNUTS":3203},{"ID":32,"HASH":"32-plzen-jih","NAZEVNUTS":"Plze\u0148-jih","NUMNUTS":3204},{"ID":33,"HASH":"33-plzen-sever","NAZEVNUTS":"Plze\u0148-sever","NUMNUTS":3205},{"ID":34,"HASH":"34-rokycany","NAZEVNUTS":"Rokycany","NUMNUTS":3206},{"ID":35,"HASH":"35-tachov","NAZEVNUTS":"Tachov","NUMNUTS":3207},{"ID":36,"HASH":"36-severozapad","NAZEVNUTS":"Severoz\u00e1pad","NUMNUTS":4000},{"ID":37,"HASH":"37-karlovarsky-kraj","NAZEVNUTS":"Karlovarsk\u00fd kraj","NUMNUTS":4100},{"ID":38,"HASH":"38-cheb","NAZEVNUTS":"Cheb","NUMNUTS":4101},{"ID":39,"HASH":"39-karlovy-vary","NAZEVNUTS":"Karlovy Vary","NUMNUTS":4102},{"ID":40,"HASH":"40-sokolov","NAZEVNUTS":"Sokolov","NUMNUTS":4103},{"ID":41,"HASH":"41-ustecky-kraj","NAZEVNUTS":"\u00dasteck\u00fd kraj","NUMNUTS":4200},{"ID":42,"HASH":"42-decin","NAZEVNUTS":"D\u011b\u010d\u00edn","NUMNUTS":4201},{"ID":43,"HASH":"43-chomutov","NAZEVNUTS":"Chomutov","NUMNUTS":4202},{"ID":44,"HASH":"44-litomerice","NAZEVNUTS":"Litom\u011b\u0159ice","NUMNUTS":4203},{"ID":45,"HASH":"45-louny","NAZEVNUTS":"Louny","NUMNUTS":4204},{"ID":46,"HASH":"46-most","NAZEVNUTS":"Most","NUMNUTS":4205},{"ID":47,"HASH":"47-teplice","NAZEVNUTS":"Teplice","NUMNUTS":4206},{"ID":48,"HASH":"48-usti-nad-labem","NAZEVNUTS":"\u00dast\u00ed nad Labem","NUMNUTS":4207},{"ID":49,"HASH":"49-severovychod","NAZEVNUTS":"Severov\u00fdchod","NUMNUTS":5000},{"ID":50,"HASH":"50-liberecky-kraj","NAZEVNUTS":"Libereck\u00fd kraj","NUMNUTS":5100},{"ID":51,"HASH":"51-ceska-lipa","NAZEVNUTS":"\u010cesk\u00e1 L\u00edpa","NUMNUTS":5101},{"ID":52,"HASH":"52-jablonec-nad-nisou","NAZEVNUTS":"Jablonec nad Nisou","NUMNUTS":5102},{"ID":53,"HASH":"53-liberec","NAZEVNUTS":"Liberec","NUMNUTS":5103},{"ID":54,"HASH":"54-semily","NAZEVNUTS":"Semily","NUMNUTS":5104},{"ID":55,"HASH":"55-kralovehradecky-kraj","NAZEVNUTS":"Kr\u00e1lov\u00e9hradeck\u00fd kraj","NUMNUTS":5200},{"ID":56,"HASH":"56-hradec-kralove","NAZEVNUTS":"Hradec Kr\u00e1lov\u00e9","NUMNUTS":5201},{"ID":57,"HASH":"57-jicin","NAZEVNUTS":"Ji\u010d\u00edn","NUMNUTS":5202},{"ID":58,"HASH":"58-nachod","NAZEVNUTS":"N\u00e1chod","NUMNUTS":5203},{"ID":59,"HASH":"59-rychnov-nad-kneznou","NAZEVNUTS":"Rychnov nad Kn\u011b\u017enou","NUMNUTS":5204},{"ID":60,"HASH":"60-trutnov","NAZEVNUTS":"Trutnov","NUMNUTS":5205},{"ID":61,"HASH":"61-pardubicky-kraj","NAZEVNUTS":"Pardubick\u00fd kraj","NUMNUTS":5300},{"ID":62,"HASH":"62-chrudim","NAZEVNUTS":"Chrudim","NUMNUTS":5301},{"ID":63,"HASH":"63-pardubice","NAZEVNUTS":"Pardubice","NUMNUTS":5302},{"ID":64,"HASH":"64-svitavy","NAZEVNUTS":"Svitavy","NUMNUTS":5303},{"ID":65,"HASH":"65-usti-nad-orlici","NAZEVNUTS":"\u00dast\u00ed nad Orlic\u00ed","NUMNUTS":5304},{"ID":66,"HASH":"66-jihovychod","NAZEVNUTS":"Jihov\u00fdchod","NUMNUTS":6000},{"ID":67,"HASH":"67-kraj-vysocina","NAZEVNUTS":"Kraj Vyso\u010dina","NUMNUTS":6100},{"ID":68,"HASH":"68-havlickuv-brod","NAZEVNUTS":"Havl\u00ed\u010dk\u016fv Brod","NUMNUTS":6101},{"ID":69,"HASH":"69-jihlava","NAZEVNUTS":"Jihlava","NUMNUTS":6102},{"ID":70,"HASH":"70-pelhrimov","NAZEVNUTS":"Pelh\u0159imov","NUMNUTS":6103},{"ID":71,"HASH":"71-trebic","NAZEVNUTS":"T\u0159eb\u00ed\u010d","NUMNUTS":6104},{"ID":72,"HASH":"72-zdar-nad-sazavou","NAZEVNUTS":"\u017d\u010f\u00e1r nad S\u00e1zavou","NUMNUTS":6105},{"ID":73,"HASH":"73-jihomoravsky-kraj","NAZEVNUTS":"Jihomoravsk\u00fd kraj","NUMNUTS":6200},{"ID":74,"HASH":"74-blansko","NAZEVNUTS":"Blansko","NUMNUTS":6201},{"ID":75,"HASH":"75-brno-mesto","NAZEVNUTS":"Brno-m\u011bsto","NUMNUTS":6202},{"ID":76,"HASH":"76-brno-venkov","NAZEVNUTS":"Brno-venkov","NUMNUTS":6203},{"ID":77,"HASH":"77-breclav","NAZEVNUTS":"B\u0159eclav","NUMNUTS":6204},{"ID":78,"HASH":"78-hodonin","NAZEVNUTS":"Hodon\u00edn","NUMNUTS":6205},{"ID":79,"HASH":"79-vyskov","NAZEVNUTS":"Vy\u0161kov","NUMNUTS":6206},{"ID":80,"HASH":"80-znojmo","NAZEVNUTS":"Znojmo","NUMNUTS":6207},{"ID":81,"HASH":"81-stredni-morava","NAZEVNUTS":"St\u0159edn\u00ed Morava","NUMNUTS":7000},{"ID":82,"HASH":"82-olomoucky-kraj","NAZEVNUTS":"Olomouck\u00fd kraj","NUMNUTS":7100},{"ID":83,"HASH":"83-jesenik","NAZEVNUTS":"Jesen\u00edk","NUMNUTS":7101},{"ID":84,"HASH":"84-olomouc","NAZEVNUTS":"Olomouc","NUMNUTS":7102},{"ID":85,"HASH":"85-prostejov","NAZEVNUTS":"Prost\u011bjov","NUMNUTS":7103},{"ID":86,"HASH":"86-prerov","NAZEVNUTS":"P\u0159erov","NUMNUTS":7104},{"ID":87,"HASH":"87-sumperk","NAZEVNUTS":"\u0160umperk","NUMNUTS":7105},{"ID":88,"HASH":"88-zlinsky-kraj","NAZEVNUTS":"Zl\u00ednsk\u00fd kraj","NUMNUTS":7200},{"ID":89,"HASH":"89-kromeriz","NAZEVNUTS":"Krom\u011b\u0159\u00ed\u017e","NUMNUTS":7201},{"ID":90,"HASH":"90-uherske-hradiste","NAZEVNUTS":"Uhersk\u00e9 Hradi\u0161t\u011b","NUMNUTS":7202},{"ID":91,"HASH":"91-vsetin","NAZEVNUTS":"Vset\u00edn","NUMNUTS":7203},{"ID":92,"HASH":"92-zlin","NAZEVNUTS":"Zl\u00edn","NUMNUTS":7204},{"ID":93,"HASH":"93-moravskoslezsko","NAZEVNUTS":"Moravskoslezsko","NUMNUTS":8000},{"ID":94,"HASH":"94-moravskoslezsky-kraj","NAZEVNUTS":"Moravskoslezsk\u00fd kraj","NUMNUTS":8100},{"ID":95,"HASH":"95-bruntal","NAZEVNUTS":"Brunt\u00e1l","NUMNUTS":8101},{"ID":96,"HASH":"96-frydek-mistek","NAZEVNUTS":"Fr\u00fddek-M\u00edstek","NUMNUTS":8102},{"ID":97,"HASH":"97-karvina","NAZEVNUTS":"Karvin\u00e1","NUMNUTS":8103},{"ID":98,"HASH":"98-novy-jicin","NAZEVNUTS":"Nov\u00fd Ji\u010d\u00edn","NUMNUTS":8104},{"ID":99,"HASH":"99-opava","NAZEVNUTS":"Opava","NUMNUTS":8105},{"ID":100,"HASH":"100-ostrava-mesto","NAZEVNUTS":"Ostrava-m\u011bsto","NUMNUTS":8106},{"ID":101,"HASH":"101-zahranici","NAZEVNUTS":"Zahrani\u010d\u00ed","NUMNUTS":9999}]}';

function sort (list, by) {
  return list.sort((a, b) => a[by].localeCompare(b[by], 'cs', {sensitivity: 'base'}));
}

function setCookie (cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

const state = {
  druhZastup: [
    {ID: 1, NAME: 'Obec'},
    {ID: 2, NAME: 'Město'},
    {ID: 3, NAME: 'Statutární město'},
    {ID: 4, NAME: 'Hl. m. Praha'},
    {ID: 5, NAME: 'Městská část či obvod'},
    {ID: 6, NAME: 'Městys'}
  ],
  typZastup: [
    {ID: 1, NAME: 'Zastupitelstvo obce,městysu,města,statutár.města,hl.m.Prahy'},
    {ID: 2, NAME: 'Zastupitelstvo městské části nebo městského obvodu'}
  ],
  enum: [],
  search: '',
  results: [],
  programs: [],
  meta: [],
  poradi: 4,
  listOfImportant: [],
  images: {
    loaded: false,
    data: []
  },
  selectedRegion: {
    data: null,
    count: null,
    countTips: 0,
    countVotes: 0,
    countTotal: 0,
    limit: 0,
    results: [],
    votes: [],
    tips: [],
    guess: [],
    listOfRepresentatives: {
      META: {
        UCAST: 0
      },
      VOLEBNI_STRANA: []
    }
  },
  selectedProgram: null,
  votes: {
    hash: '',
    view: '',
    hashLoading: false,
    hashAnonymous: true,
    dataLoaded: false,
    dataLoading: false,
    voteLoading: false,
    data: [],
    modal: {
      show: false,
      vote: false,
      type: '',
      generate: null,
      load: null,
      error: '',
      candidate: null
    }
  },
  votesPreview: {
    view: '',
    data: []
  },
  votingEnabled: false,
  votingDisplay: false
};

const getters = {
  vuexState: state => state
};

const mutations = {
  checkTime (state, payload) {
    state.votingEnabled = Math.floor(new Date().getTime() / 1000) < 1538431200; // 1538431200;
    state.votingDisplay = Math.floor(new Date().getTime() / 1000) > 1538827200; // 1538827200;

    if (state.votingEnabled === false) console.warn('Hlasování bylo ukončeno');
  },
  modal (state, payload) {
    state.votes.modal.show = payload.show || false;
    state.votes.modal.vote = payload.vote || false;
    state.votes.modal.candidate = payload.candidate || false;
    state.votes.modal.type = payload.type || 'tip';
    state.votes.modal.load = payload.load || null;
    state.votes.modal.generate = payload.generate || null;
    state.votes.modal.error = payload.error || '';
  },
  prepareCandidates (state) {

    state.listOfImportant = [];

    var json = JSON.parse(LIST_IMPORTANT);
    json.data.forEach(item => state.listOfImportant.push(item));
    // state.listOfImportant = sort(state.listOfImportant, 'HASH');
  },
  prepareRegions (state) {

    state.enum = [];

    var json = JSON.parse(LIST_REGIONS);
    json.data.forEach(item => state.enum.push(item));
  },
  storeResults (state, payload) {
    state.results = [];

    payload.forEach(item => {
      if (state.results.filter(a => a.ID_ZASTUPITELSTVO === item.ID_ZASTUPITELSTVO).length > 0) return;
      state.results.push(item)
    });

    state.results = sort(state.results, 'NAZEVZAST');
  },
  storeMeta (state, payload) {
    state.meta = [];

    payload.forEach(item => state.meta.push(item));
  },
  storePrograms (state, payload) {
    state.programs = [];

    payload.forEach(item => state.programs.push(item));
  },
  storeImages (state, payload) {
    payload.forEach(item => state.images.data.push(item));

    state.images.loaded = true;
  },
  clearSearch (state) {
    state.search = '';
    state.results = [];
  },
  clearPrograms (state) {
    state.programs = [];
    state.selectedRegion.data = null;
  },
  clearImages (state) {
    state.images.data = [];
  },
  setVoteHash (state, payload) {
    state.votes.hash = payload.hash;
    state.votes.view = payload.view;
    state.votes.hashLoading = false;
    state.votes.hashAnonymous = payload.hash.charAt(0) === 'A';
  },
  setVotes (state, payload) {
    state.votes.data = [];
    payload.forEach(item => state.votes.data.push(item));
    state.votes.dataLoading = false;
    state.votes.voteLoading = false;
    state.votes.dataLoaded = true;
  },
  modalError (state, payload) {
    state.votes.modal.error = payload;
    state.votes.dataLoading = false;
  },
  storeVotesPreview (state, payload) {
    state.votesPreview.data = [];
    state.votesPreview.view = payload.view;
    payload.list.forEach(item => state.votesPreview.data.push(item));
  },
  updateProgram (state, payload) {
    state.selectedProgram = payload;
  },
  updateRegion (state, payload) {
    state.selectedRegion.data = payload;
  },
  updateProgramVotes (state, payload) {
    state.selectedProgram.votes = payload.votes;
    state.selectedProgram.tips = payload.tips;
  },
  updateRegionVotes (state, payload) {
    state.selectedRegion.count = payload.POCET;
    state.selectedRegion.results = [];

    var countTips = 0;
    var countVotes = 0;

    if (payload.RESULTS) {
      payload.RESULTS.forEach(result => {
        state.selectedRegion.results.push({
          ID_KANDIDAT: result.ID_KANDIDAT,
          COUNT: result['COUNT(ID_KANDIDAT)']
        });
      });
    }

    if (payload.TIPS) {

      state.selectedRegion.tips = [];

      payload.TIPS.forEach(result => {
        state.selectedRegion.tips.push({
          ID_KANDIDAT: result.ID_KANDIDAT,
          COUNT: result['COUNT(ID_KANDIDAT)']
        });

        countTips += Number(result['COUNT(ID_KANDIDAT)']);
      });
    }

    if (payload.VOTES) {

      state.selectedRegion.votes = [];

      payload.VOTES.forEach(result => {
        state.selectedRegion.votes.push({
          ID_KANDIDAT: result.ID_KANDIDAT,
          COUNT: result['COUNT(ID_KANDIDAT)']
        });

        countVotes += Number(result['COUNT(ID_KANDIDAT)']);
      });
    }

    state.selectedRegion.countTips = countTips;
    state.selectedRegion.countVotes = countVotes;
    state.selectedRegion.countTotal = countTips + countVotes;

  },
  updateRegionGuess (state, payload) {
    state.selectedRegion.guess = [];

    if (payload) {
      payload.forEach(guess => {
        state.selectedRegion.guess.push(guess);
      });
    }
  },
  updateRegionVotesLimit (state, payload) {
    state.selectedRegion.limit = payload;
  },
  updateProgramWithList (state, payload) {
    state.selectedProgram.order = payload.order || 0;

    if (!payload.list) {
      state.selectedProgram.listOfCandidates = [];
      return;
    }

    var candidates = payload.list.split(';;');

    state.selectedProgram.listOfCandidates = [];

    candidates.forEach(candidate => {
      var data = candidate.split('::');

      state.selectedProgram.listOfCandidates.push({
        order: data[0],
        fullname: data[1] + (data[1].length > 0 ? ' ' : '') + data[3] + ' ' + data[4] + (data[2].length > 0 ? ', ' : '') + data[2],
        age: data[5],
        work: data[6]
      });
    });
  },
  updateProgramWithRepresentatives (state, payload) {
    if (!payload) {
      state.selectedRegion.listOfRepresentatives.META.UCAST = 0;
      state.selectedRegion.listOfRepresentatives.VOLEBNI_STRANA = [];
    } else {
      state.selectedRegion.listOfRepresentatives.META.UCAST = payload.META.UCAST;
      state.selectedRegion.listOfRepresentatives.VOLEBNI_STRANA = [];

      payload.VOLEBNI_STRANA.forEach(item => {
        state.selectedRegion.listOfRepresentatives.VOLEBNI_STRANA.push(item);
      });

      state.selectedRegion.listOfRepresentatives.VOLEBNI_STRANA.sort((a, b) => b.META.HLASY - a.META.HLASY);
    }
  }
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const actions = {
  ga (context, payload) {

    context.commit('checkTime');

    document.title = payload.title;

    if (window.gtag) {
      window.gtag('config', 'UA-4347750-17', {'page_path': payload.path, 'page_title': payload.title});
    } else {
      console.log('GA:', '/' + payload.path, ' : ', payload.title);
    }
  },
  fetchVotesPreview (context, payload) {

    axios.get('/', {
      params: {
        action: 'vote.preview',
        search: payload
      }
    }).then(response => {
      context.commit('storeVotesPreview', {
        list: response.data.list,
        view: payload
      })
    });
  },
  setHash (context, payload) {
    context.dispatch('fetchVotes', {hash: payload});
  },
  getHash (context, payload) {
    if (context.state.votes.hashLoading === true) return;
    context.state.votes.hashLoading = true;

    var params = {action: 'hash.generate'};

    if (payload && payload.id) {
      params.id = payload.id * 2 + 2;
      params.sm = payload.sm;
    }

    axios.get('/', {
      params: params
    }).then(response => {
      context.commit('setVoteHash', {
        hash: response.data.hash,
        view: response.data.view
      });
      setCookie('vote_hash', response.data.hash, 7);
      if (payload && payload.onComplete) payload.onComplete(response.data.hash);
    });
  },
  fetchVotes (context, payload) {
    if (context.state.votes.dataLoaded === true) return;
    if (context.state.votes.dataLoading === true) return;

    context.state.votes.dataLoading = true;

    axios.get('/', {
      params: {
        action: 'vote.fetch',
        search: payload.hash || context.state.votes.hash
      }
    }).then(response => {
      if (response.data.code === 200) {
        context.commit('setVoteHash', {
          hash: payload.hash || context.state.votes.hash,
          view: response.data.list[0].VIEW
        });
        context.commit('setVotes', response.data.list);
        setCookie('vote_hash', context.state.votes.hash, 7);
        if (payload && payload.onComplete) payload.onComplete(response.data.hash);
      } else {
        context.commit('modalError', response.data.message);
      }
    });
  },
  vote (context, payload) {
    if (context.state.votes.voteLoading === true) return;
    context.state.votes.voteLoading = true;

    axios.post('/?action=vote.add', JSON.stringify({
      hash: payload.hash,
      region: payload.region,
      candidate: payload.candidate,
      type: payload.type
    })).then(response => {
      context.commit('setVotes', response.data.list);
      if (payload.onComplete) payload.onComplete();
    });
  },
  fetchEnum (context) {
    context.commit('prepareCandidates');
    context.commit('prepareRegions');
  },
  search (context, payload) {
    axios.get('/', {
      params: {action: 'location.fetch', search: payload}
    }).then(response => {
      context.commit('storeResults', response.data.list);
    });
  },
  fetchImages (context, payload) {

    context.commit('clearImages');

    axios.get('/', {
      params: {action: 'images.fetch'}
    }).then(response => {
      context.commit('storeImages', response.data.list);
      if (payload.onComplete) payload.onComplete();
    });
  },
  fetchDetail (context, payload) {

    context.commit('clearPrograms');

    axios.get('/', {
      params: {action: 'program.fetch', search: payload.id}
    }).then(response => {
      context.commit('storePrograms', response.data.data);
      context.commit('updateRegion', response.data.meta[0]);
      context.commit('updateRegionVotes', response.data.votes);
      context.commit('updateRegionVotesLimit', response.data.votesLimit);
      context.commit('updateRegionGuess', response.data.guess);
      context.commit('updateProgramWithRepresentatives', response.data.representatives);
      // context.commit('storeMeta', response.data.meta);
      if (payload.onComplete) payload.onComplete();
    });
  },
  fetchDetailPriority (context, payload) {

    context.commit('clearPrograms');

    axios.get('/', {
      params: {action: 'program.detail', search: payload.id}
    }).then(response => {
      context.commit('updateProgram', response.data.detail);
      context.commit('updateRegion', response.data.meta);
      context.commit('updateProgramVotes', response.data);
      context.commit('updateProgramWithList', {
        list: response.data.detail.KANDIDATI,
        order: response.data.detail.PORADI
      });
      if (payload.onComplete) payload.onComplete();
    });
  },
  fetchListOfCandidates (context, payload) {
    axios.get('/', {
      params: {action: 'program.list', search: payload.id}
    }).then(response => {
      context.commit('updateProgramWithList', response.data);
      if (payload.onComplete) payload.onComplete();
    });
  },
  fetchListOfRepresentatives (context, payload) {
    axios.get('/', {
      params: {action: 'program.representatives', search: payload.id}
    }).then(response => {
      context.commit('updateProgramWithRepresentatives', response.data.representatives);
      if (payload.onComplete) payload.onComplete();
    });
  },
  suggest (context, payload) {
    axios.post('/?action=program.add', JSON.stringify(payload).split('.').join('(DOT)'), config).then(response => {
      // console.log(response);
    });
  },
  guess (context, payload) {
    axios.post('/?action=guess.add', JSON.stringify({
      title: payload.title,
      values: payload.values,
      who: payload.hash,
      region: payload.region,
      coalition: payload.coalition
    }), config).then(response => {
      if (response.data.code === 200) {
        if (payload.onComplete) payload.onComplete(response.data.hash);
      } else {
        if (payload.onError) payload.onError(response.data.message);
      }
    });
  }
};

mutations.prepareCandidates(state);
mutations.prepareRegions(state);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
