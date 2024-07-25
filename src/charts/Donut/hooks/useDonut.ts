export const useDonut = () => {
  const data = (done: number, pending: number) => {
    return {
      type: 'doughnut',
      labels: ['Done', 'Pending'],
      datasets: [
        {
          label: 'Tasks',
          data: [done, pending],
          backgroundColor: ['rgb(100, 255, 0)', 'rgb(255, 99, 132)'],
          borderColor: 'black',
          borderWidth: 1,
          hoverOffset: 4,
          cutout: '50%',
          radius: '100%',
        },
      ],
    }
  }

  const options = ():any => {
    return {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Completition rate',
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          padding: 90,
          labels: {
            color: 'black',
            boxWidth: 20,
            padding: 30,
            boxHeight: 20,
          },
        },
      },
    }
  }

  return { data, options }
}
