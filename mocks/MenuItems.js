/* eslint-disable */
const url = process.env.NEXT_PUBLIC_WP_DOMAIN
const navigationLinks = [
  {
    'name': 'membership',
    'url': url + '/join',
    'child': [
      {
        'name': 'free',
        'url': url + '/join/free',
        'icon': 'https://pics.freeicons.io/uploads/icons/png/14408565341606428214-512.png'
      },
      {
        'name': 'premium news letter',
        'url': url + '/premium-newsletters/',
        'icon': 'https://pics.freeicons.io/uploads/icons/png/2851733471580378372-512.png'
      },
      {
        'name': 'premium',
        'url': url + '/premium/',
        'icon': 'https://pics.freeicons.io/uploads/icons/png/20435650381595759949-512.png'
      }
    ]
  },
  {
    'name': 'store',
    'url': '/',
    'child': [
      {
        'name': 'courses',
        'url': '/courses'
      },
      {
        'name': 'books',
        'url': '/books'
      },
      {
        'name': 'memberships',
        'url': '/memberships'
      }
    ]
  },
  {
    'name': 'resources',
    'url': url + '/resources',
    'child': [
      {
        'name': 'education',
        'url': url + '/education-center'
      },
      {
        'name': 'news',
        'url': url + '/news'
      },
      {
        'name': 'tech',
        'url': url + '/tech/'
      },
      {
        'name': 'newsletter sign up',
        'url': url + '/free-goods'
      }
    ]
  },
  {
    'name': 'traders',
    'url': url + '/traders'
  },
  {
    'name': 'login',
    'url': '/login'
  },
  {
    'name': 'dashboard',
    'url': url + '/dashboard',
    'child': [
      {
        'name': 'my memberships',
        'url': ''
      },
      {
        'name': 'my classes',
        'url': url + '/dashboard/classes'
      },
      {
        'name': 'my books',
        'url': url + '/dashboard/books'
      },
      {
        'name': 'my account',
        'url': url + '/dashboard/account'
      },
      {
        'name': 'support',
        'url': url + '/support'
      },
      {
        'name': 'logout',
        'url': url + '/dashboard/account/customer-logout/'
      }
    ]
  },
]

export default navigationLinks
