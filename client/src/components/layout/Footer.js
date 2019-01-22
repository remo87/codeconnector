import React from 'react'

export default function Footer() {
  return (
    <footer>
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        Coryright &copy; {new Date().getFullYear()} DevConnector
      </footer>
    </footer>
  )
}
