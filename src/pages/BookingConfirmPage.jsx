function BookingConfirmPage() {
  return (
    <div className="text-center">
      <h2 className="fw-bold mb-3 text-success">Booking Confirmed!</h2>

      <p className="text-muted">
        Your hotel booking has been successfully confirmed.
      </p>

      <div className="mt-4">
        <a href="/" className="btn btn-primary me-2">
          Go to Home
        </a>

        <a href="/dashboard" className="btn btn-outline-secondary">
          View My Bookings
        </a>
      </div>
    </div>
  );
}

export default BookingConfirmPage;
