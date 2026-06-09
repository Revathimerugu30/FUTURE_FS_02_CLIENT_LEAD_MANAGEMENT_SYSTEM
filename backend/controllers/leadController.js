const mongoose = require('mongoose');
const Lead = require('../models/Lead');

const demoLeads = [
  { _id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-0101', company: 'Tech Corp', status: 'New', source: 'Website', value: 15000, notes: [], createdAt: new Date(), updatedAt: new Date() },
  { _id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', phone: '555-0102', company: 'Finance LLC', status: 'Contacted', source: 'Referral', value: 12000, notes: [], createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(Date.now() - 86400000) },
  { _id: '3', name: 'Michael Chen', email: 'michael@example.com', phone: '555-0103', company: 'Design Studio', status: 'Converted', source: 'Email Campaign', value: 22000, notes: [], createdAt: new Date(Date.now() - 172800000), updatedAt: new Date(Date.now() - 172800000) },
  { _id: '4', name: 'Emily Davis', email: 'emily@example.com', phone: '555-0104', company: 'StartUp Inc', status: 'New', source: 'Website', value: 6000, notes: [], createdAt: new Date(Date.now() - 259200000), updatedAt: new Date(Date.now() - 259200000) },
  { _id: '5', name: 'Robert Wilson', email: 'robert@example.com', phone: '555-0105', company: 'Global Trade', status: 'Contacted', source: 'Phone', value: 9000, notes: [], createdAt: new Date(Date.now() - 345600000), updatedAt: new Date(Date.now() - 345600000) },
  { _id: '6', name: 'Jessica Brown', email: 'jessica@example.com', phone: '555-0106', company: 'Media Group', status: 'New', source: 'Referral', value: 7200, notes: [], createdAt: new Date(Date.now() - 432000000), updatedAt: new Date(Date.now() - 432000000) },
  { _id: '7', name: 'David Martinez', email: 'david@example.com', phone: '555-0107', company: 'Cloud Services', status: 'Lost', source: 'Website', value: 4800, notes: [], createdAt: new Date(Date.now() - 518400000), updatedAt: new Date(Date.now() - 518400000) },
  { _id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', phone: '555-0108', company: 'Data Systems', status: 'Converted', source: 'Email Campaign', value: 19000, notes: [], createdAt: new Date(Date.now() - 604800000), updatedAt: new Date(Date.now() - 604800000) },
  { _id: '9', name: 'James Taylor', email: 'james@example.com', phone: '555-0109', company: 'Energy Corp', status: 'Contacted', source: 'Website', value: 10500, notes: [], createdAt: new Date(Date.now() - 691200000), updatedAt: new Date(Date.now() - 691200000) },
  { _id: '10', name: 'Maria Garcia', email: 'maria@example.com', phone: '555-0110', company: 'Health Plus', status: 'New', source: 'Referral', value: 8200, notes: [], createdAt: new Date(Date.now() - 777600000), updatedAt: new Date(Date.now() - 777600000) },
  { _id: '11', name: 'Daniel Lee', email: 'daniel@example.com', phone: '555-0111', company: 'Retail Hub', status: 'New', source: 'Social Media', value: 9800, notes: [], createdAt: new Date(Date.now() - 864000000), updatedAt: new Date(Date.now() - 864000000) },
  { _id: '12', name: 'Olivia Patel', email: 'olivia@example.com', phone: '555-0112', company: 'FinTech Labs', status: 'Contacted', source: 'Cold Call', value: 13400, notes: [], createdAt: new Date(Date.now() - 950400000), updatedAt: new Date(Date.now() - 950400000) },
  { _id: '13', name: 'Ethan Wright', email: 'ethan@example.com', phone: '555-0113', company: 'Logistics Co', status: 'Converted', source: 'Trade Show', value: 17800, notes: [], createdAt: new Date(Date.now() - 1036800000), updatedAt: new Date(Date.now() - 1036800000) },
  { _id: '14', name: 'Ava King', email: 'ava@example.com', phone: '555-0114', company: 'AdWorks', status: 'Lost', source: 'Email Campaign', value: 5600, notes: [], createdAt: new Date(Date.now() - 1123200000), updatedAt: new Date(Date.now() - 1123200000) },
  { _id: '15', name: 'Noah Scott', email: 'noah@example.com', phone: '555-0115', company: 'LogiTech', status: 'New', source: 'Website', value: 7200, notes: [], createdAt: new Date(Date.now() - 1209600000), updatedAt: new Date(Date.now() - 1209600000) },
  { _id: '16', name: 'Sophia Green', email: 'sophia@example.com', phone: '555-0116', company: 'Wellness Works', status: 'Contacted', source: 'Referral', value: 12800, notes: [], createdAt: new Date(Date.now() - 1296000000), updatedAt: new Date(Date.now() - 1296000000) },
  { _id: '17', name: 'Liam White', email: 'liam@example.com', phone: '555-0117', company: 'EduSmart', status: 'Converted', source: 'Social Media', value: 21500, notes: [], createdAt: new Date(Date.now() - 1382400000), updatedAt: new Date(Date.now() - 1382400000) },
  { _id: '18', name: 'Mia Carter', email: 'mia@example.com', phone: '555-0118', company: 'HealthTech', status: 'Lost', source: 'Phone', value: 6400, notes: [], createdAt: new Date(Date.now() - 1468800000), updatedAt: new Date(Date.now() - 1468800000) },
  { _id: '19', name: 'Lucas Ramirez', email: 'lucas@example.com', phone: '555-0119', company: 'InfraBuild', status: 'New', source: 'Trade Show', value: 9400, notes: [], createdAt: new Date(Date.now() - 1555200000), updatedAt: new Date(Date.now() - 1555200000) },
  { _id: '20', name: 'Isabella Nguyen', email: 'isabella@example.com', phone: '555-0120', company: 'Green Energy', status: 'Contacted', source: 'Website', value: 11300, notes: [], createdAt: new Date(Date.now() - 1641600000), updatedAt: new Date(Date.now() - 1641600000) },
  { _id: '21', name: 'Mason Hill', email: 'mason@example.com', phone: '555-0121', company: 'SecureNet', status: 'Converted', source: 'Referral', value: 18200, notes: [], createdAt: new Date(Date.now() - 1728000000), updatedAt: new Date(Date.now() - 1728000000) },
  { _id: '22', name: 'Amelia Adams', email: 'amelia@example.com', phone: '555-0122', company: 'TravelPro', status: 'Lost', source: 'Email Campaign', value: 5100, notes: [], createdAt: new Date(Date.now() - 1814400000), updatedAt: new Date(Date.now() - 1814400000) },
  { _id: '23', name: 'James Brown', email: 'james.brown@example.com', phone: '555-0123', company: 'Eventify', status: 'New', source: 'Social Media', value: 8700, notes: [], createdAt: new Date(Date.now() - 1900800000), updatedAt: new Date(Date.now() - 1900800000) },
  { _id: '24', name: 'Harper Lee', email: 'harper@example.com', phone: '555-0124', company: 'BuildPro', status: 'Contacted', source: 'Phone', value: 10100, notes: [], createdAt: new Date(Date.now() - 1987200000), updatedAt: new Date(Date.now() - 1987200000) },
];

const getDemoLead = (id) => demoLeads.find((lead) => lead._id.toString() === id.toString());

// @desc    Get all leads with search, filter, pagination
// @route   GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    const { search, status, source, page = 1, limit = 10, sort = '-createdAt' } = req.query;
    
    try {
      const query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { company: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ];
      }
      if (status && status !== 'All') query.status = status;
      if (source && source !== 'All') query.source = source;

      const total = await Lead.countDocuments(query);
      const leads = await Lead.find(query)
        .populate('assignedTo', 'name email')
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit));

      return res.json({
        success: true,
        data: leads,
        pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      });
    } catch (dbError) {
      // Return demo data if database is unavailable
      const pageNumber = Number(page) || 1;
      const limitNumber = Number(limit) || 10;
      let filteredLeads = [...demoLeads];
      if (search) {
        const searchValue = search.toLowerCase();
        filteredLeads = filteredLeads.filter((lead) =>
          lead.name.toLowerCase().includes(searchValue)
          || lead.email.toLowerCase().includes(searchValue)
          || lead.company.toLowerCase().includes(searchValue)
          || lead.phone.toLowerCase().includes(searchValue)
        );
      }
      if (status && status !== 'All') {
        filteredLeads = filteredLeads.filter((lead) => lead.status === status);
      }
      const totalLeads = filteredLeads.length;
      const start = (pageNumber - 1) * limitNumber;
      const paginatedLeads = filteredLeads.slice(start, start + limitNumber);

      return res.json({
        success: true,
        data: paginatedLeads,
        pagination: {
          total: totalLeads,
          page: pageNumber,
          limit: limitNumber,
          pages: Math.ceil(totalLeads / limitNumber),
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
exports.getLead = async (req, res) => {
  try {
    try {
      const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, data: lead });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, data: demoLead });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create lead
// @route   POST /api/leads
exports.createLead = async (req, res) => {
  try {
    const leadData = { ...req.body };
    if (mongoose.Types.ObjectId.isValid(req.user.id)) {
      leadData.assignedTo = req.user.id;
    }
    const lead = await Lead.create(leadData);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    // If MongoDB is unavailable, return a demo lead instead of failing completely
    const demoLead = {
      _id: `${Date.now()}`,
      ...req.body,
      status: req.body.status || 'New',
      source: req.body.source || 'Website',
      value: req.body.value || 0,
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    demoLeads.push(demoLead);
    res.status(201).json({ success: true, data: demoLead });
  }
};

// @desc    Update lead
// @route   PUT /api/leads/:id
exports.updateLead = async (req, res) => {
  try {
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true,
      });
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, data: lead });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      Object.assign(demoLead, req.body, { updatedAt: new Date() });
      return res.json({ success: true, data: demoLead });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
exports.deleteLead = async (req, res) => {
  try {
    try {
      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, message: 'Lead deleted successfully' });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      const index = demoLeads.findIndex((lead) => lead._id.toString() === req.params.id.toString());
      if (index !== -1) demoLeads.splice(index, 1);
      return res.json({ success: true, message: 'Lead deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/status/:id
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    try {
      const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      return res.json({ success: true, data: lead });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      demoLead.status = status;
      demoLead.updatedAt = new Date();
      return res.json({ success: true, data: demoLead });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Add note to lead
// @route   POST /api/leads/:id/notes
exports.addNote = async (req, res) => {
  try {
    const { content, followUpDate } = req.body;
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      lead.notes.push({ content, adminName: req.user.name, followUpDate });
      await lead.save();
      return res.status(201).json({ success: true, data: lead });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      demoLead.notes.push({ content, adminName: req.user.name, followUpDate, _id: `${Date.now()}` });
      demoLead.updatedAt = new Date();
      return res.status(201).json({ success: true, data: demoLead });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete note from lead
// @route   DELETE /api/leads/:id/notes/:noteId
exports.deleteNote = async (req, res) => {
  try {
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
      lead.notes = lead.notes.filter((n) => n._id.toString() !== req.params.noteId);
      await lead.save();
      return res.json({ success: true, data: lead });
    } catch (dbError) {
      const demoLead = getDemoLead(req.params.id);
      if (!demoLead) return res.status(404).json({ success: false, message: 'Lead not found' });
      demoLead.notes = demoLead.notes.filter((n) => n._id.toString() !== req.params.noteId);
      demoLead.updatedAt = new Date();
      return res.json({ success: true, data: demoLead });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
// @desc    Get analytics data
// @route   GET /api/analytics
exports.getAnalytics = async (req, res) => {
  try {
    try {
      const totalLeads = await Lead.countDocuments();
      const statusCounts = await Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);
      const sourceCounts = await Lead.aggregate([
        { $group: { _id: '$source', count: { $sum: 1 } } },
      ]);
      // Monthly leads for last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      sixMonthsAgo.setDate(1);
      sixMonthsAgo.setHours(0, 0, 0, 0);
      const monthlyLeads = await Lead.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);

      const statusMap = {};
      statusCounts.forEach((s) => (statusMap[s._id] = s.count));

      const newLeads = statusMap['New'] || 0;
      const contacted = statusMap['Contacted'] || 0;
      const converted = statusMap['Converted'] || 0;
      const lost = statusMap['Lost'] || 0;
      const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0;

      // Recent leads
      const recentLeads = await Lead.find().sort('-createdAt').limit(5).select('name email status createdAt');

      return res.json({
        success: true,
        data: {
          totalLeads, newLeads, contacted, converted, lost,
          conversionRate: Number(conversionRate),
          statusCounts: statusCounts.map((s) => ({ name: s._id, value: s.count })),
          sourceCounts: sourceCounts.map((s) => ({ name: s._id, value: s.count })),
          monthlyLeads,
          recentLeads,
        },
      });
    } catch (dbError) {
      // Return dynamic demo data if database is unavailable
      const totalLeads = demoLeads.length;
      const statusMap = demoLeads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {});
      const sourceMap = demoLeads.reduce((acc, lead) => {
        acc[lead.source] = (acc[lead.source] || 0) + 1;
        return acc;
      }, {});
      const newLeads = statusMap.New || 0;
      const contacted = statusMap.Contacted || 0;
      const converted = statusMap.Converted || 0;
      const lost = statusMap.Lost || 0;
      const conversionRate = totalLeads > 0 ? Number(((converted / totalLeads) * 100).toFixed(1)) : 0;

      const statusCounts = ['New', 'Contacted', 'Converted', 'Lost'].map((name) => ({ name, value: statusMap[name] || 0 }));
      const sourceCounts = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      sixMonthsAgo.setDate(1);
      sixMonthsAgo.setHours(0, 0, 0, 0);
      const monthlyLeads = [];
      for (let i = 0; i < 6; i += 1) {
        const monthDate = new Date(sixMonthsAgo);
        monthDate.setMonth(sixMonthsAgo.getMonth() + i);
        monthlyLeads.push({ _id: { year: monthDate.getFullYear(), month: monthDate.getMonth() + 1 }, count: 0 });
      }
      demoLeads.forEach((lead) => {
        const created = new Date(lead.createdAt);
        monthlyLeads.forEach((month) => {
          if (created.getFullYear() === month._id.year && created.getMonth() + 1 === month._id.month) {
            month.count += 1;
          }
        });
      });

      const recentLeads = [...demoLeads]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((lead) => ({ _id: lead._id, name: lead.name, email: lead.email, status: lead.status, createdAt: lead.createdAt }));

      const demoData = {
        totalLeads,
        newLeads,
        contacted,
        converted,
        lost,
        conversionRate,
        statusCounts,
        sourceCounts,
        monthlyLeads,
        recentLeads,
      };
      return res.json({ success: true, data: demoData });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
