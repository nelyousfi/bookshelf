# Application State

## Background

State is easier to maintain when the code for it is located as closely as
possible to where it's used. Because of this, it's best to use local state and
then to
[lift state up to the least common parent](https://reactjs.org/docs/lifting-state-up.html)
when it needs to be shared between sibling components.

That said, if you have to lift state up very far away from the places it's used,
it becomes a real pain to
[drill that state](https://kentcdodds.com/blog/prop-drilling) all over the
place. Once you hit that point, it's best to use React context.

A common mistake with context is to automatically put the provider as a globally
accessible context value. Context doesn't have to be used this way. It can and
should be only responsible for the part of the react tree where it has any
relevance. It should still be located at the least common parent where it's
being used (it just so happens that sometimes the least common parent IS the
root of the application, but not always). There are maintainability and
performance benefits to managing "global" state this way.

One pattern that I've found to be very effective in managing state in an
application (when using context and useReducer) is by creating two contexts:

1. The state context
2. The dispatch context

Doing things this way has some performance benefits as well as makes things more
clear and flexible in the long-term. It may seem annoying at first, but trust
me, after you start doing things this way, you'll grow to love it. Anecdotally,
this is what Facebook does and they've been using React and hooks for a lot
longer than anyone else.

Another useful element of this pattern is for the module that manages the
context to also expose some utilities to make updates more straightforward. So
we'll be doing that as well.

## Exercise

For this exercise, I updated the auth-context to use a special
`bootstrapAppData` API which will load the user's personal account data as well
as all the other data needed for the application to start up. I also created a
new context just for the `user` which would be the place you would manage the
user's information during the lifetime of the app (for example, for use on an
account settings page).

For your exercise, you need to write the logic for the `list-item` context.
You'll also need to wire up a few of the methods around the app.

You'll find our helpful little emoji around the app.

Files:

- `src/context/list-item-context.js`
- `src/authenticated-app.js`
- `src/components/list-item-list.js`
- `src/components/book-row.js`
- `src/screens/book.js`
- `src/components/rating.js`
- `src/components/status-buttons.js`

## 🦉 Elaboration & Feedback

After the instruction, copy the URL below into your browser and fill out the
form: http://ws.kcd.im/?ws=build%20a%20react%20app&e=App%20State&em=
