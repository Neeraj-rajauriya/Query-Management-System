import Complaint from '../models/Complaint.js';

export const createComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const complaint = new Complaint({
      user: req.user.id,
      title,
      description,
    });
    
    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getComplaints = async (req, res) => {
  try {
    let complaints;

    // Check if the user is an admin
    if (req.user.role === 'admin') {
      // Admin can view all complaints
      complaints = await Complaint.find().populate('user', 'name');
    } else {
      // Regular user can only view their own complaints
      complaints = await Complaint.find({ user: req.user.id });
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateComplaint = async (req, res) => {
  const { status, assignedTo } = req.body;
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status || complaint.status;
    complaint.assignedTo = assignedTo || complaint.assignedTo;

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
