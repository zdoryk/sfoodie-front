export default function ({ store, redirect }) {
  // If the user is not authenticated
  // if (!store.state.authenticated) {
  if (screen.width <= 420) return redirect(301, '/program/AllReceipts/Mobile');
  else return redirect(301, '/program/AllReceipts/Desktop');
  // }
}
