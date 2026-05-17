import { ref } from 'vue'
import { fetchItems, getAssetUrl } from '@/services/directus.js'
import componentImg  from '@/assets/product/component.png'
import pcimImg       from '@/assets/index/pcim.png'
import mosfetImg     from '@/assets/index/mosfet.png'
import powerImg      from '@/assets/index/power.png'
import certImg       from '@/assets/index/certification.png'
import app1          from '@/assets/index/application1.png'
import app2          from '@/assets/index/application2.png'

const igbtProducts = [
  { name: 'EG75W3LT-120H',  category: 'IGBT Module',       spec: '75A / 1200V',  desc: 'Half-bridge IGBT module with fast switching and low VCE(sat) for inverter applications.',  img: componentImg, to: '/product/3' },
  { name: 'EG150W3LT-120H', category: 'IGBT Module',       spec: '150A / 1200V', desc: 'High-current IGBT module designed for industrial motor drives and UPS systems.',             img: componentImg, to: '/product/5' },
  { name: 'EG100W3LT-170H', category: 'IGBT Module',       spec: '100A / 1700V', desc: 'High-voltage IGBT for medium-voltage drives and STATCOM applications.',                      img: componentImg, to: '/product/4' },
  { name: 'EG50W3LT-065H',  category: 'SiC MOSFET Module', spec: '50A / 650V',   desc: 'SiC MOSFET for high-frequency DC/DC converters and EV on-board chargers.',                  img: componentImg, to: '/product/2' },
  { name: 'EG200W3LT-120H', category: 'IGBT Module',       spec: '200A / 1200V', desc: 'Full-bridge high-power module for traction and renewable energy inverters.',                  img: componentImg, to: '/product/6' },
  { name: 'EG25W3LT-065H',  category: 'Rectifier Module',  spec: '25A / 650V',   desc: 'Compact rectifier module for SMPS front-end and industrial power supplies.',                 img: componentImg, to: '/product/1' },
]

const fallbackNews = [
  {
    id: 'f1', category: 'Exhibitions', title: 'MacMic will be attended in PCIM 2024',
    desc: 'We are thrilled to announce that MacMic will be showcasing our latest power semiconductor solutions at PCIM 2024.',
    author: 'Jeremy Jean', date: '1 April 2024', img: pcimImg,
    tags: ['PCIM 2024', 'Exhibition', 'MacMic', 'Power Semiconductors'],
    body: '<p>We are thrilled to announce that MacMic Science & Technology will be participating in PCIM Europe 2024, one of the world\'s leading conferences and exhibitions for power electronics, intelligent motion, renewable energy, and energy management.</p><p>PCIM Europe will be held from 11–13 June 2024 at the Nuremberg Exhibition Centre in Germany. MacMic will be showcasing its latest portfolio of IGBT modules, SiC MOSFET modules, rectifier modules, and discrete devices designed for high-efficiency power conversion applications.</p><p>At our booth, visitors will have the opportunity to explore new product releases, speak directly with our application engineers, and learn about the performance advantages of MacMic\'s latest generation power semiconductors.</p><p>We warmly invite all customers, partners, and industry professionals to visit the MacMic booth. For those wishing to schedule a meeting with our engineering or sales teams, please contact us in advance.</p>',
    relatedProducts: [igbtProducts[0], igbtProducts[3], igbtProducts[5]],
  },
  {
    id: 'f2', category: 'Products', title: 'MOSFET MODULE — MMN600DB015B',
    desc: 'MacMic MOSFET modules come with outstanding switching performance, ideal for high-frequency applications.',
    author: 'Jeremy Jean', date: '1 April 2024', img: mosfetImg,
    tags: ['MOSFET', 'Module', 'MMN Series', 'High Frequency'],
    body: '<p>MacMic is proud to introduce the MMN600DB015B, a new addition to our MOSFET module lineup designed to deliver exceptional switching performance in demanding high-frequency applications.</p><p>The MMN600DB015B features a dual N-channel configuration rated at 600V / 15mΩ RDS(on), housed in a compact 62mm package with optimized internal layout for minimum stray inductance. Ideal for DC-DC converters and server power supplies operating above 100kHz.</p><p>Key specifications: VDSS = 600V, ID = 75A at 25°C, RDS(on) max = 15mΩ, Tj max = 175°C. Integrates a body diode with ultra-fast recovery to minimize reverse recovery losses.</p><p>Samples and datasheets are available now. Contact your nearest EFF representative or submit a quotation request through our website.</p>',
    relatedProducts: [igbtProducts[3], igbtProducts[0], igbtProducts[1]],
  },
  {
    id: 'f3', category: 'Products', title: 'HIGH POWER IGBT DISCRETE IN TO-247 PLUS PACKAGE',
    desc: 'IGBT discrete in TO-247 Plus package for high power density applications with improved thermal performance.',
    author: 'Michaela Augus', date: '1 April 2024', img: powerImg,
    tags: ['IGBT', 'Discrete', 'TO-247 Plus', 'High Power'],
    body: '<p>MacMic announces the release of its new high-power IGBT discrete series in the TO-247 Plus package — enhanced with a Kelvin emitter pin for more precise gate drive control and reduced dynamic losses.</p><p>The dedicated Kelvin emitter allows gate drive circuitry to be referenced to a low-inductance emitter connection, significantly reducing switching losses — especially beneficial in half-bridge and full-bridge topologies.</p><p>The series covers 650V to 1700V with current ratings from 40A to 120A, all featuring MacMic\'s latest Trench-FS IGBT chip with VCE(sat) of 1.65V typical at 1200V/75A.</p><p>Production quantities available from Q2 2024. Engineering samples can be requested through EFF.</p>',
    relatedProducts: [igbtProducts[0], igbtProducts[2], igbtProducts[4]],
  },
  {
    id: 'f4', category: 'Certifications', title: 'CERTIFICATION OF GENERAL AEO',
    desc: 'Efficient International Technology has achieved the AEO certification, reinforcing our commitment to global trade compliance.',
    author: 'Kim Gurameh', date: '1 April 2024', img: certImg,
    tags: ['AEO', 'Certification', 'Trade Compliance', 'Customs'],
    body: '<p>Efficient International Technology Co., Ltd. is proud to announce that we have successfully obtained the Authorized Economic Operator (AEO) — General Certification issued by the Republic of China Customs Administration.</p><p>AEO-certified companies benefit from faster customs clearance, fewer physical inspections, and priority treatment in post-clearance audits — directly benefiting our customers through faster delivery lead times.</p><p>This certification reflects our company\'s ongoing commitment to supply chain security, regulatory compliance, and operational excellence in the global power semiconductor market.</p>',
    relatedProducts: [igbtProducts[0], igbtProducts[1], igbtProducts[5]],
  },
  {
    id: 'f5', category: 'Products', title: 'NEW SiC MOSFET MODULE SERIES RELEASED',
    desc: 'Our new SiC MOSFET module series offers best-in-class efficiency for demanding EV and industrial applications.',
    author: 'Jeremy Jean', date: '15 March 2024', img: app1,
    tags: ['SiC', 'MOSFET', 'EV', 'Wide Bandgap'],
    body: '<p>EFF and MacMic are excited to announce the launch of the MSC Series — a new family of SiC MOSFET modules engineered for EV and industrial power conversion applications.</p><p>SiC technology delivers lower switching losses at high frequencies, higher thermal conductivity, and junction temperatures up to 200°C — enabling system efficiency improvements of 1–3% vs. silicon.</p><p>The initial release covers 62mm, half-bridge, and full-bridge packages in 1200V and 1700V, with on-resistances from 5mΩ to 25mΩ. Targets include EV traction inverters, OBCs, and solar string inverters.</p>',
    relatedProducts: [igbtProducts[3], igbtProducts[0], igbtProducts[4]],
  },
  {
    id: 'f6', category: 'Exhibitions', title: 'EFF AT TAIWAN ELECTRONICA 2024',
    desc: 'Visit us at Taiwan Electronica 2024 to explore our full product range and speak with our technical experts.',
    author: 'Jeremy Jean', date: '10 February 2024', img: app2,
    tags: ['Taiwan Electronica', 'Exhibition', 'EFF', '2024'],
    body: '<p>Efficient International Technology (EFF) will be exhibiting at Taiwan Electronica 2024, scheduled for September 2024 at the Taipei Nangang Exhibition Center.</p><p>The EFF booth will feature our complete product portfolio — IGBT modules, SiC MOSFET modules, rectifier modules, discretes, and accessories from MacMic, Dynex, PEM, and Hitto.</p><p>Our application engineers will be on-site for technical consultations, product selection assistance, and live demonstrations of our product selection tools.</p>',
    relatedProducts: [igbtProducts[0], igbtProducts[1], igbtProducts[3]],
  },
  {
    id: 'f7', category: 'Products', title: 'RECTIFIER MODULE — MBR SERIES UPDATE',
    desc: 'Updated MBR series rectifier modules deliver improved forward voltage characteristics and longer operational life.',
    author: 'Michaela Augus', date: '5 January 2024', img: pcimImg,
    tags: ['Rectifier', 'MBR Series', 'Module', 'Update'],
    body: '<p>MacMic has released a significant update to the MBR Series rectifier modules, with improvements to forward voltage characteristics and package reliability that extend service life in demanding industrial environments.</p><p>The updated MBR Series reduces forward voltage drop (VF) by 8% vs. the previous generation — lower conduction losses and reduced thermal stress in three-phase bridge rectifier configurations.</p><p>New die-attach material improves thermal cycling performance. The devices remain fully pin-to-pin compatible with previous MBR Series for drop-in replacement.</p>',
    relatedProducts: [igbtProducts[5], igbtProducts[0], igbtProducts[1]],
  },
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
      const remote = items.map(item => ({
        ...item,
        img: getAssetUrl(item.image),
        date: formatDate(item.date),
        relatedProducts: (item.related_products || [])
          .map(i => igbtProducts[i])
          .filter(Boolean),
      }))
      news.value = [...remote, ...fallbackNews]
    } catch (e) {
      news.value = fallbackNews
    } finally {
      loading.value = false
    }
  }

  return { news, loading, error, fetchNews }
}
