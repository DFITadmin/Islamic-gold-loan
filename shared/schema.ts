import { pgTable, text, serial, integer, boolean, timestamp, real, doublePrecision, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").notNull().default("customer"), // admin, loan_officer, customer
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Client model
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  identificationNumber: text("identification_number").notNull(),
  identificationType: text("identification_type").notNull(), // national_id, passport, etc.
  nationality: text("nationality").default("Malaysian"),
  stateOfResidence: text("state_of_residence"), // Malaysian state
  religion: text("religion"), // For Malaysia's regulatory requirements
  race: text("race"), // Required for Malaysian demographics
  bnmConsent: boolean("bnm_consent").default(false), // Bank Negara Malaysia regulations consent
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

// Gold items model
export const goldItems = pgTable("gold_items", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // jewelry, coin, bar, etc.
  weight: decimal("weight").notNull(), // in grams
  purity: integer("purity").notNull(), // 24K, 22K, 18K, etc. (stored as 24, 22, 18)
  description: text("description"),
  estimatedValue: decimal("estimated_value").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGoldItemSchema = createInsertSchema(goldItems).omit({
  id: true,
  createdAt: true,
});

// Loan model
export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  contractNumber: text("contract_number").notNull().unique(),
  goldItemIds: text("gold_item_ids").notNull(), // Comma-separated IDs of gold items
  totalGoldValue: decimal("total_gold_value").notNull(),
  financingAmount: decimal("financing_amount").notNull(),
  financingRatio: decimal("financing_ratio").notNull(), // e.g., 0.65 for 65%
  status: text("status").notNull().default("pending"), // pending, verification, approved, active, completed, rejected
  profit: decimal("profit").notNull(), // Islamic profit rate
  term: integer("term").notNull(), // in months
  paymentFrequency: text("payment_frequency").notNull(), // monthly, quarterly, etc.
  shariahContract: text("shariah_contract").default("murabahah"), // Islamic contract type: murabahah, qard, etc.
  aqadDate: timestamp("aqad_date"), // Contract execution date (Malaysia requirement)
  bnmApprovalStatus: text("bnm_approval_status").default("pending"), // BNM approval status
  bnmReferenceNumber: text("bnm_reference_number"), // BNM reference number for approved loans
  malaysiaStampDuty: decimal("malaysia_stamp_duty"), // Malaysian stamp duty amount
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: integer("created_by").notNull(), // User ID who created the loan
  assignedTo: integer("assigned_to"), // User ID of loan officer assigned
});

export const insertLoanSchema = createInsertSchema(loans).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  startDate: true,
  endDate: true,
});

// Payment model
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  loanId: integer("loan_id").notNull(),
  amount: decimal("amount").notNull(),
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  status: text("status").notNull().default("pending"), // pending, paid, overdue
  paymentMethod: text("payment_method"),
  referenceNumber: text("reference_number"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  paidDate: true,
});

// Notification model
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // system, payment, contract, etc.
  status: text("status").notNull().default("unread"), // unread, read
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Gold price history for tracking market rates
export const goldPriceHistory = pgTable("gold_price_history", {
  id: serial("id").primaryKey(),
  pricePerOz: decimal("price_per_oz").notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGoldPriceHistorySchema = createInsertSchema(goldPriceHistory).omit({
  id: true,
  createdAt: true,
});

// Document model for storing documents related to loans
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  loanId: integer("loan_id").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // contract, identification, gold_appraisal, etc.
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  documentNumber: text("document_number"), // For tracking documents in Malaysian system
  issuingAuthority: text("issuing_authority"), // The authority that issued the document
  expiryDate: timestamp("expiry_date"), // When the document expires (for Malaysian compliance)
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type GoldItem = typeof goldItems.$inferSelect;
export type InsertGoldItem = z.infer<typeof insertGoldItemSchema>;

export type Loan = typeof loans.$inferSelect;
export type InsertLoan = z.infer<typeof insertLoanSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type GoldPriceHistory = typeof goldPriceHistory.$inferSelect;
export type InsertGoldPriceHistory = z.infer<typeof insertGoldPriceHistorySchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
