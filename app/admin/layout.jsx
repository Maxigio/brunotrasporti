// Pure passthrough — auth and chrome are handled by AdminProtected.
// This layout intentionally has no auth check so that /admin/login
// renders correctly without triggering a redirect loop.
export default function AdminLayout({ children }) {
  return children
}
