export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-gray-600">
        <p className="font-semibold text-gray-800">Practical Energy Solutions</p>
        <p className="mt-1">
          Licensed electrical contracting — troubleshooting, remodels, and EV
          charging.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Practical Energy Solutions. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
