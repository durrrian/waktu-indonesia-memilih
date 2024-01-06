export const NO1_BAR_COLOR = '#749C75'
export const NO2_BAR_COLOR = '#FFB449'
export const NO3_BAR_COLOR = '#FF5A5F'

export const namaKandidat = ['Anies & Cak Imin', 'Prabowo & Gibran', 'Ganjar & Mahfud']

export const makePercentage = (
  data: {
    name: string
    no1: number
    no2: number
    no3: number
  }[],
) => {
  const totalVotesPerAgeGroup = data.map((item) => ({
    ...item,
    total: item.no1 + item.no2 + item.no3,
  }))

  // Calculate percentage of votes for each candidate in each age group
  const percentageData = totalVotesPerAgeGroup.map((item) => ({
    name: item.name,
    no1: (item.no1 / item.total) * 100,
    no2: (item.no2 / item.total) * 100,
    no3: (item.no3 / item.total) * 100,
  }))

  return percentageData
}
