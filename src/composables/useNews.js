import { ref } from 'vue'
import { fetchItems, getAssetUrl } from '@/services/directus.js'
import componentImg from '@/assets/product/component.png'

const igbtProducts = [
  { name: 'EG75W3LT-120H',  category: 'IGBT Module',       spec: '75A / 1200V',  desc: 'Half-bridge IGBT module with fast switching and low VCE(sat) for inverter applications.',  img: componentImg, to: '/product/3' },
  { name: 'EG150W3LT-120H', category: 'IGBT Module',       spec: '150A / 1200V', desc: 'High-current IGBT module designed for industrial motor drives and UPS systems.',             img: componentImg, to: '/product/5' },
  { name: 'EG100W3LT-170H', category: 'IGBT Module',       spec: '100A / 1700V', desc: 'High-voltage IGBT for medium-voltage drives and STATCOM applications.',                      img: componentImg, to: '/product/4' },
  { name: 'EG50W3LT-065H',  category: 'SiC MOSFET Module', spec: '50A / 650V',   desc: 'SiC MOSFET for high-frequency DC/DC converters and EV on-board chargers.',                  img: componentImg, to: '/product/2' },
  { name: 'EG200W3LT-120H', category: 'IGBT Module',       spec: '200A / 1200V', desc: 'Full-bridge high-power module for traction and renewable energy inverters.',                  img: componentImg, to: '/product/6' },
  { name: 'EG25W3LT-065H',  category: 'Rectifier Module',  spec: '25A / 650V',   desc: 'Compact rectifier module for SMPS front-end and industrial power supplies.',                 img: componentImg, to: '/product/1' },
]

function formatDate(isoDate) {
  if (!isoDate) return ''
  const d = new Date(isoDate)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function useNews() {
  const news = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchNews() {
    loading.value = true
    error.value = null
    try {
      const items = await fetchItems('news', {
        'sort': '-date',
        'fields': 'id,category,title,desc,author,date,image,body,tags,related_products',
      })
      news.value = items.map(item => ({
        ...item,
        img: getAssetUrl(item.image),
        date: formatDate(item.date),
        relatedProducts: (item.related_products || [])
          .map(i => igbtProducts[i])
          .filter(Boolean),
      }))
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return { news, loading, error, fetchNews }
}
