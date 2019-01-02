import Vue from 'vue';
import Router from 'vue-router';
import LayoutHomepage from '@/layout/homepage/do';
import LayoutDetail from '@/layout/detail/do';
import LayoutDetailGraph from '@/layout/detail-graph/do';
import LayoutCandidates from '@/layout/candidates/do';
import LayoutRegions from '@/layout/regions/do';
import LayoutCandidate from '@/layout/candidate/do';
import LayoutEdit from '@/layout/edit/do';
import LayoutStaticImpressum from '@/layout/static/impressum/do';
import LayoutStaticVoting from '@/layout/static/voting/do';
import LayoutStaticCookies from '@/layout/static/cookies/do';
import LayoutImage from '@/layout/image/do';
import LayoutImages from '@/layout/images/do';
import LayoutHash from '@/layout/hash/do';
import LayoutGuessForm from '@/layout/guess-form/do';
import LayoutGuessResults from '@/layout/guess-results/do';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: LayoutHomepage
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: LayoutStaticImpressum
    },
    {
      path: '/hlasovani',
      name: 'Hlasování',
      component: LayoutStaticVoting
    },
    {
      path: '/cookies',
      name: 'Cookies',
      component: LayoutStaticCookies
    },
    {
      path: '/kandidati',
      name: 'List of Candidates',
      component: LayoutCandidates
    },
    {
      path: '/kandidat/:hash',
      name: 'Detail of Candidate',
      component: LayoutCandidate,
      props: true,
    },
    {
      path: '/kandidat/:hash/form',
      name: 'Edit Candidate',
      component: LayoutEdit,
      props: true,
    },
    {
      path: '/infografika',
      name: 'List of images',
      component: LayoutImages
    },
    {
      path: '/infografika/:hash',
      name: 'Detail of image',
      component: LayoutImage,
      props: true,
    },
    {
      path: '/hlasovani/:hash',
      name: 'Hlasovací lístek',
      component: LayoutHash,
      props: true,
    },
    {
      path: '/mista',
      name: 'List of Regions',
      component: LayoutRegions
    },
    {
      path: '/misto/:hash',
      name: 'Detail',
      component: LayoutDetail,
      props: true,
    },
    {
      path: '/misto/:hash/prubezne-vysledky-hlasovani',
      name: 'Results',
      component: LayoutDetailGraph,
      props: (route) => {
        return {hash: route.params.hash, type: 'votes'}
      },
    },
    {
      path: '/misto/:hash/prubezne-vysledky-tipovani',
      name: 'Results Tips',
      component: LayoutDetailGraph,
      props: (route) => {
        return {hash: route.params.hash, type: 'tips'}
      },
    },
    {
      path: '/misto/:hash/prubezne-hlasovani',
      name: 'Results Votes',
      component: LayoutDetailGraph,
      props: (route) => {
        return {hash: route.params.hash, type: 'overall'}
      },
    },
    {
      path: '/misto/:hash/novy-odhad',
      name: 'Guess',
      component: LayoutGuessForm,
      props: true,
    },
    {
      path: '/misto/:hash/odhad/:guess',
      name: 'Guess Results',
      component: LayoutGuessResults,
      props: true,
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.userAuth === -1) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;
