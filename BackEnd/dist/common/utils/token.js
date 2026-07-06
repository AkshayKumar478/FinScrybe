"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const crypto_1 = require("crypto");
const generateToken = () => (0, crypto_1.randomUUID)();
exports.generateToken = generateToken;
