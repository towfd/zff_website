import { ref } from 'vue'
import { fetchItems } from '@/services/directus.js'

const fallbackPartners = [
  {
    id: 'macmic', slug: 'macmic',
    name: 'MacMic',
    tag: 'Power Modules & Discretes',
    color: '#2d5016',
    desc: 'MacMic Science & Technology Co., Ltd. is a leading manufacturer of power semiconductor modules and discretes. Their product range covers IGBT modules, rectifier modules, FRED modules, SCR modules, SiC MOSFET modules, and a comprehensive line of discrete devices — all built to deliver outstanding cost performance for industrial, EV, and renewable energy applications.',
    products: ['IGBT Module', 'Rectifier Module', 'FRED Module', 'SCR Module', 'SiC MOSFET Module', 'IGBT Discretes', 'Diode Discretes'],
    website: '#',
  },
  {
    id: 'dynex', slug: 'dynex',
    name: 'Dynex',
    tag: 'High Power Semiconductors',
    color: '#1a3a6e',
    desc: 'Dynex Semiconductor is a UK-based manufacturer specializing in high-power semiconductor devices for demanding applications including HVDC transmission, railway traction, and renewable energy systems. Their products are renowned for reliability in mission-critical environments.',
    products: ['High-Power IGBT', 'High-Power Diode', 'Press-Pack Devices'],
    website: '#',
  },
  {
    id: 'pem', slug: 'pem',
    name: 'PEM',
    tag: 'Busbars & Power Electronics',
    color: '#7a4a00',
    desc: 'PEM (Power Electronics Modules) is a specialist in laminated busbars and power electronic assemblies. Their custom-engineered busbar solutions reduce parasitic inductance, improve system reliability, and simplify assembly in high-power converters and inverters.',
    products: ['Laminated Busbar', 'Power Assembly', 'Custom Busbar Solutions'],
    website: '#',
  },
  {
    id: 'hitto', slug: 'hitto',
    name: 'Hitto',
    tag: 'Passive Components',
    color: '#4a1a6e',
    desc: 'Hitto specializes in high-quality passive components including relays and fuses designed for power electronics applications. Their products provide essential protection and switching functions in industrial systems, power supplies, and EV applications.',
    products: ['Relay', 'Fuse', 'Protection Devices'],
    website: '#',
  },
]

export function usePartners() {
  const partners = ref([])
  const loading = ref(false)

  async function fetchPartners() {
    loading.value = true
    try {
      const items = await fetchItems('partners', {
        'sort': 'sort',
        'fields': 'slug,name,tag,color,desc,products,website',
      })
      const remote = items.map(item => ({ ...item, id: item.slug }))
      partners.value = [...remote, ...fallbackPartners]
    } catch {
      partners.value = fallbackPartners
    } finally {
      loading.value = false
    }
  }

  return { partners, loading, fetchPartners }
}
