export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult
    if (typeof removedIndex === 'undefined' && typeof addedIndex === 'undefined') return arr

    const result = [...arr]
    let itemToAdd = payload

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}
export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}
export const data = () => {
    return [

        {
            id: 1,
            className: "wentwell",
            color: '#009688',
            title: "Went Well",
            items: [
                {
                    id: 1,
                    data: `Source D`
                }
            ]
        },
        {
            id: 3,
            className: "improve",
            color: '#e91e63',
            title: "To improve",
            items: [
                {
                    id: 3,
                    data: `Sourceasdasdas Draggable - 13`
                }
            ]
        },
        {
            id: 4,
            className: "actions",
            color: '#9c27b0',
            title: "Actions",
            items: [
                {
                    id: 4,
                    data: `Source Draggable`
                }
            ]
        }

    ]
}
