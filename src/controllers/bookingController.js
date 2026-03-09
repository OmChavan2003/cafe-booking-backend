const db = require('../config/db');

// 1. Create a new booking (CREATE)
exports.createBooking = async (req, res) => {
    try {
        const { 
            customer_name, service_type, assigned_staff, 
            booking_date, booking_time, service_description, 
            service_fee, status 
        } = req.body;
        
        const query = `
            INSERT INTO Service_Booking 
            (customer_name, service_type, assigned_staff, booking_date, booking_time, service_description, service_fee, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        // We use placeholders (?) to prevent SQL injection attacks
        const [result] = await db.execute(query, [
            customer_name, service_type, assigned_staff, 
            booking_date, booking_time, service_description || null, 
            service_fee, status || 'Scheduled'
        ]);
        
        res.status(201).json({ message: 'Booking created successfully!', booking_id: result.insertId });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

// 2. Fetch all bookings (READ)
exports.getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Service_Booking ORDER BY booking_date ASC, booking_time ASC');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

// 3. Update a booking (UPDATE)
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params; // Get the booking ID from the URL
        const { 
            customer_name, service_type, assigned_staff, 
            booking_date, booking_time, service_description, 
            status, service_fee 
        } = req.body;
        
        const query = `
            UPDATE Service_Booking 
            SET customer_name = ?, service_type = ?, assigned_staff = ?, 
                booking_date = ?, booking_time = ?, service_description = ?, 
                status = ?, service_fee = ?
            WHERE booking_id = ?
        `;
        
        const [result] = await db.execute(query, [
            customer_name, service_type, assigned_staff, 
            booking_date, booking_time, service_description || null, 
            status, service_fee, id
        ]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json({ message: 'Booking updated successfully!' });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
};

// 4. Delete a booking (DELETE)
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.execute('DELETE FROM Service_Booking WHERE booking_id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.status(200).json({ message: 'Booking deleted successfully!' });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
};