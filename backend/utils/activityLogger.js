const { ActivityLog } = require('../models');

const logActivity = async (adminId, action, details = '', ip = null) => {
    try {
        if (!adminId) return;
        await ActivityLog.create({
            admin_id: adminId,
            action,
            details,
            ip_address: ip
        });
    } catch (err) {
        console.error('Failed to log activity:', err);
    }
};

module.exports = logActivity;
