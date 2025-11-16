const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    transId: { type: String, required: true, unique: true, index: true },
    amount: { type: Number, required: true, min: 100 },
    email: { type: String },
    phone: { type: String },
    redirectUrl: { type: String },
    link: { type: String },

    status: {
      type: String,
      enum: ['pending', 'success', 'failed', 'cancelled'],
      default: 'pending',
      index: true,
    },

    serviceName: { type: String },
    transType: { type: String },
    externalId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    financialTransId: { type: String },

    dateInitiated: { type: Date },
    dateConfirmed: { type: Date },

    gatewayResponse: { type: mongoose.Schema.Types.Mixed },
    lastStatusPayload: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

PaymentSchema.index({ status: 1, dateInitiated: -1 });

module.exports = mongoose.model('Payment', PaymentSchema);
