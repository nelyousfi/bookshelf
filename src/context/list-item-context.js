import React from 'react'
// 🐨 import the auth context to get the initial listItems
// 🐨 import the user context to get the user
// 🐨 import the list-items-client from '../utils/list-items-client'

// 🐨 create two contexts here:
// 1) ListItemStateContext
// 2) ListItemDispatchContext

// 🐨 create your reducer here. I recommend treating the state as an array of
// listItems. It can be your standard switch statement reducer with the
// following types:
// - add: concat the action.listItem to the listItems
// - remove: filter out the listItem with the matching action.id
// - update: find the list item that matches the action.listItem.id and merge that list item with action.listItem

// 🦉 It's a good idea to add a `default` which throws an error indicating that
// a dispatch was made with an incorrect type.

function ListItemProvider({children}) {
  // 🐨 get {data} from useAuth. This will be the bootstrapped data.

  // 🐨 use React.useReducer here to get state and dispatch.
  // you can initialize it with the initial value set to data.listItems

  // 🐨 render both of your context providers. The values should be set to:
  // ListItemStateContext: state
  // ListItemDispatchContext: dispatch

  // 💰 make sure to render the children prop!
  return <div>context/list-item-context.js TODO</div>
}

// 🐨 create three utilities: `removeListItem`, `addListItem`, and `updateListItem`:
// each will accept dispatch as the first argument and any other aguments it
// needs to pass along to the corresponding listItemClient method

// 💰 here, I'll give you one of them so you know what I mean.
// function updateListItem(dispatch, listItemId, updates) {
//   return listItemClient.update(listItemId, updates).then(data => {
//     dispatch({type: 'update', listItem: data.listItem})
//     return data
//   })
// }

// 🐨 create a custom hook for each of your contexts:
// - useListItemDispatch
// - useListItemState

// 🐨 several of the pages need the listItem for a specific bookId, so let's
// make another custom hook for that called `useSingleListItemState` and have
// it accept the `bookId`
// 💰 This one will need to use the `useListItemState` and `useUser`
// then you can find the right list item with this:
// return listItems.find(li => li.ownerId === user.id && li.bookId === bookId)
// isnt' composition the best!?

export {
  ListItemProvider,
  // useListItemDispatch,
  // useListItemState,
  // useSingleListItemState,
  // removeListItem,
  // addListItem,
  // updateListItem,
}

// just in case you wanna test the finished version out...
// export * from './list-item-context.finished'
