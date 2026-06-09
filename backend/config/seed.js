const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const User = require('../models/User');
const Lead = require('../models/Lead');

const demoLeads = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-0101',
    company: 'Tech Corp',
    status: 'New',
    source: 'Website',
    value: 15000,
    notes: [
      { content: 'Follow up next week', adminName: 'Admin User', followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '555-0102',
    company: 'Finance LLC',
    status: 'Contacted',
    source: 'Referral',
    value: 12000,
    notes: [
      { content: 'Prepare proposal for finance team', adminName: 'Admin User', followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    ],
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '555-0103',
    company: 'Design Studio',
    status: 'Converted',
    source: 'Email Campaign',
    value: 22000,
    notes: [
      { content: 'Send onboarding documents', adminName: 'Admin User', followUpDate: new Date() },
    ],
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '555-0104',
    company: 'StartUp Inc',
    status: 'New',
    source: 'Website',
    value: 6000,
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    phone: '555-0105',
    company: 'Global Trade',
    status: 'Contacted',
    source: 'Cold Call',
    value: 9000,
  },
  {
    name: 'Jessica Brown',
    email: 'jessica.brown@example.com',
    phone: '555-0106',
    company: 'Media Group',
    status: 'New',
    source: 'Referral',
    value: 7200,
  },
  {
    name: 'David Martinez',
    email: 'david.martinez@example.com',
    phone: '555-0107',
    company: 'Cloud Services',
    status: 'Lost',
    source: 'Website',
    value: 4800,
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    phone: '555-0108',
    company: 'Data Systems',
    status: 'Converted',
    source: 'Email Campaign',
    value: 19000,
  },
  {
    name: 'James Taylor',
    email: 'james.taylor@example.com',
    phone: '555-0109',
    company: 'Energy Corp',
    status: 'Contacted',
    source: 'Website',
    value: 10500,
  },
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '555-0110',
    company: 'Health Plus',
    status: 'New',
    source: 'Referral',
    value: 8200,
  },
  {
    name: 'Daniel Lee',
    email: 'daniel.lee@example.com',
    phone: '555-0111',
    company: 'Retail Hub',
    status: 'New',
    source: 'Social Media',
    value: 9800,
  },
  {
    name: 'Olivia Patel',
    email: 'olivia.patel@example.com',
    phone: '555-0112',
    company: 'FinTech Labs',
    status: 'Contacted',
    source: 'Cold Call',
    value: 13400,
  },
  {
    name: 'Ethan Wright',
    email: 'ethan.wright@example.com',
    phone: '555-0113',
    company: 'Logistics Co',
    status: 'Converted',
    source: 'Trade Show',
    value: 17800,
  },
  {
    name: 'Ava King',
    email: 'ava.king@example.com',
    phone: '555-0114',
    company: 'AdWorks',
    status: 'Lost',
    source: 'Email Campaign',
    value: 5600,
  },
  {
    name: 'Noah Scott',
    email: 'noah.scott@example.com',
    phone: '555-0115',
    company: 'LogiTech',
    status: 'New',
    source: 'Website',
    value: 7200,
  },
  {
    name: 'Sophia Green',
    email: 'sophia.green@example.com',
    phone: '555-0116',
    company: 'Wellness Works',
    status: 'Contacted',
    source: 'Referral',
    value: 12800,
  },
  {
    name: 'Liam White',
    email: 'liam.white@example.com',
    phone: '555-0117',
    company: 'EduSmart',
    status: 'Converted',
    source: 'Social Media',
    value: 21500,
  },
  {
    name: 'Mia Carter',
    email: 'mia.carter@example.com',
    phone: '555-0118',
    company: 'HealthTech',
    status: 'Lost',
    source: 'Cold Call',
    value: 6400,
  },
  {
    name: 'Lucas Ramirez',
    email: 'lucas.ramirez@example.com',
    phone: '555-0119',
    company: 'InfraBuild',
    status: 'New',
    source: 'Trade Show',
    value: 9400,
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    phone: '555-0120',
    company: 'Green Energy',
    status: 'Contacted',
    source: 'Website',
    value: 11300,
  },
];

const seedDatabase = async () => {
  const userCount = await User.countDocuments();
  let adminUser = null;

  if (userCount === 0) {
    adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@crm.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('✅ Seeded admin user: admin@crm.com / admin123');
  } else {
    adminUser = await User.findOne({ email: 'admin@crm.com' });
  }

  const leadCount = await Lead.countDocuments();
  if (leadCount === 0) {
    const leadDocs = demoLeads.map((lead) => ({
      ...lead,
      assignedTo: adminUser ? adminUser._id : undefined,
    }));
    await Lead.insertMany(leadDocs);
    console.log(`✅ Seeded ${leadDocs.length} demo leads`);
  } else {
    console.log(`ℹ️ ${leadCount} leads already exist, skipping seed.`);
  }
};

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}

module.exports = seedDatabase;
