const CONFIGS   = ['Half-Bridge','Common Anode','Full Bridge','6in1','7in1','3-Level','Hybrid Pack','Single Switch']
const CHIPS     = ['Standard','Fast Switching']
const VOLTAGES  = ['650V','750V','1200V','1700V']
const HOUSINGS  = ['34mm','45mm','62mm','Econo Dual','Econo Pack2','Econo Pack3','Easy 1B','Easy 2B','Easy 3B','Econo PIM2','Econo PIM3','HPD','Pack4']
const IC_VALUES = [25,50,75,100,150,200,250,300,400,600]

export const allProducts = Array.from({ length: 100 }, (_, i) => {
  const ic       = IC_VALUES[i % IC_VALUES.length]
  const config   = CONFIGS[Math.floor(i / 13) % CONFIGS.length]
  const chip     = CHIPS[i % CHIPS.length]
  const volt     = VOLTAGES[Math.floor(i / 25) % VOLTAGES.length]
  const housing  = HOUSINGS[i % HOUSINGS.length]
  const voltCode = { '650V':'065','750V':'075','1200V':'120','1700V':'170' }[volt]
  const vce      = { '650V':1.65,'750V':1.75,'1200V':2.00,'1700V':2.35 }[volt]
  const ptot     = ic + 178
  const rthJC    = +(0.90 - ic / 1500).toFixed(2)
  return {
    id: i + 1,
    name: `EG${ic}W3LT-${voltCode}H`,
    category: 'IGBT Module',
    icNom: ic, vceSat: vce, ptot, rthJC,
    configuration: config, chipType: chip, voltage: volt, housing,
  }
})
