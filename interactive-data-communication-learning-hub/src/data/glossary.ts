/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlossaryItem } from '../types';

export const glossaryData: GlossaryItem[] = [
  {
    word: 'ACK (Acknowledgement)',
    definition: 'A control frame sent by a receiver to confirm that a data packet has arrived intact and error-free.',
    category: 'Data Link Control',
    related: ['NAK', 'Stop-and-Wait', 'Flow Control']
  },
  {
    word: 'Attenuation',
    definition: 'The loss of signal strength or power as it travels through a transmission medium, often requiring repeaters or amplifiers.',
    category: 'Introduction',
    related: ['Noise', 'Transmission Medium']
  },
  {
    word: 'Backoff Time',
    definition: 'A randomized delay period a station waits before attempting to retransmit a frame after a packet collision.',
    category: 'Multiple Access',
    related: ['CSMA/CD', 'CSMA/CA', 'Pure ALOHA']
  },
  {
    word: 'Bit Stuffing',
    definition: 'A framing technique where a sender inserts an extra 0-bit after five consecutive 1-bits in the payload to prevent it from mimicking the start/end flag byte.',
    category: 'Data Link Control',
    related: ['Byte Stuffing', 'Framing', 'Flag']
  },
  {
    word: 'Byte Stuffing',
    definition: 'A framing technique where the sender inserts a special Escape (ESC) character before any data characters that happen to match the protocol frame boundaries.',
    category: 'Data Link Control',
    related: ['Bit Stuffing', 'Framing']
  },
  {
    word: 'CDMA (Code Division Multiple Access)',
    definition: 'A channelization method where users share the same frequency band and time simultaneously, distinguished by unique orthogonal spreading codes.',
    category: 'Multiple Access',
    related: ['TDMA', 'FDMA', 'Channelization']
  },
  {
    word: 'CHAP (Challenge Handshake Authentication Protocol)',
    definition: 'A secure 3-way handshake protocol used by PPP to periodically verify credentials without ever transmitting password values over the link.',
    category: 'Point-to-Point',
    related: ['PAP', 'Authentication', 'PPP']
  },
  {
    word: 'Checksum',
    definition: 'An error detection method that groups data into fixed-size segments, sums their values in binary arithmetic, and appends the ones-complement sum.',
    category: 'Data Link Control',
    related: ['CRC', 'Parity', 'Error Detection']
  },
  {
    word: 'Collision',
    definition: 'The overlapping of electrical or radio signals when two or more devices attempt to transmit data over the same shared medium at the exact same time.',
    category: 'Multiple Access',
    related: ['CSMA/CD', 'Jam Signal', 'ALOHA']
  },
  {
    word: 'CRC (Cyclic Redundancy Check)',
    definition: 'A highly reliable error detection system using modulo-2 binary division of the payload by a mathematical generator polynomial.',
    category: 'Data Link Control',
    related: ['Checksum', 'FCS']
  },
  {
    word: 'CSMA/CA (Collision Avoidance)',
    definition: 'A random access protocol used in wireless networks (Wi-Fi) where stations use RTS/CTS handshakes and dynamic backoff intervals to actively avoid packet collisions.',
    category: 'Multiple Access',
    related: ['CSMA/CD', 'RTS', 'CTS']
  },
  {
    word: 'CSMA/CD (Collision Detection)',
    definition: 'A random access protocol used in wired Ethernet where stations actively listen while transmitting and immediately halt and send a jam signal if a collision is detected.',
    category: 'Multiple Access',
    related: ['CSMA/CA', 'Jam Signal', 'Exponential Backoff']
  },
  {
    word: 'CTS (Clear to Send)',
    definition: 'A control frame sent by a wireless Access Point to authorize a specific station to transmit, notifying other stations to keep the channel quiet.',
    category: 'Multiple Access',
    related: ['RTS', 'CSMA/CA']
  },
  {
    word: 'FCS (Frame Check Sequence)',
    definition: 'An extra block of bits (such as a CRC remainder) appended to the end of a data link frame, allowing the receiver to verify bit integrity.',
    category: 'Data Link Control',
    related: ['CRC', 'Checksum']
  },
  {
    word: 'FDMA (Frequency Division Multiple Access)',
    definition: 'A channelization method that partitions the total available transmission bandwidth into discrete, non-overlapping frequency channels.',
    category: 'Multiple Access',
    related: ['TDMA', 'CDMA']
  },
  {
    word: 'Flow Control',
    definition: 'A set of procedures that restricts the amount of data a sender can transmit before receiving an ACK, preventing buffer overflow on slow receivers.',
    category: 'Data Link Control',
    related: ['Sliding Window', 'Stop-and-Wait', 'Piggybacking']
  },
  {
    word: 'Full-Duplex',
    definition: 'A communication mode where data can flow in both directions between two nodes simultaneously.',
    category: 'Introduction',
    related: ['Half-Duplex', 'Simplex']
  },
  {
    word: 'Half-Duplex',
    definition: 'A communication mode where data can flow in both directions, but only one node can transmit at any single instant.',
    category: 'Introduction',
    related: ['Full-Duplex', 'Simplex']
  },
  {
    word: 'HDLC (High-Level Data Link Control)',
    definition: 'An ISO-standard bit-oriented data link protocol that supports both point-to-point and multipoint configurations over synchronous lines.',
    category: 'Point-to-Point',
    related: ['PPP', 'Frame Format']
  },
  {
    word: 'Jam Signal',
    definition: 'A short, high-energy signal transmitted by a CSMA/CD station upon detecting a collision to ensure all other active nodes realize a collision occurred.',
    category: 'Multiple Access',
    related: ['CSMA/CD', 'Collision']
  },
  {
    word: 'LCP (Link Control Protocol)',
    definition: 'The PPP sub-protocol responsible for establishing, configuring, testing, and shutting down physical node-to-node connections.',
    category: 'Point-to-Point',
    related: ['PPP', 'NCP', 'Authentication']
  },
  {
    word: 'NAK (Negative Acknowledgement)',
    definition: 'A negative confirmation frame sent back to a sender indicating that a specific frame arrived damaged or with incorrect checksums.',
    category: 'Data Link Control',
    related: ['ACK', 'Error Control']
  },
  {
    word: 'NCP (Network Control Protocol)',
    definition: 'A PPP sub-protocol designed to configure and negotiate network-layer protocols (like IPv4, IPv6) running over the active PPP link.',
    category: 'Point-to-Point',
    related: ['PPP', 'LCP']
  },
  {
    word: 'PAP (Password Authentication Protocol)',
    definition: 'An insecure 2-way password validation protocol used in PPP where credentials are sent in plain text across the line.',
    category: 'Point-to-Point',
    related: ['CHAP', 'PPP', 'Authentication']
  },
  {
    word: 'Piggybacking',
    definition: 'An optimization that nests receiver acknowledgements directly inside outgoing data headers to minimize packet counts.',
    category: 'Data Link Control',
    related: ['Flow Control', 'ACK']
  },
  {
    word: 'PPP (Point-to-Point Protocol)',
    definition: 'The standard multi-protocol framework used to establish direct communication links between adjacent internet nodes (DSL, WAN routers).',
    category: 'Point-to-Point',
    related: ['HDLC', 'LCP', 'NCP']
  },
  {
    word: 'RTS (Request to Send)',
    definition: 'A control frame sent by a wireless node to the Access Point requesting permission to transmit, detailing the intended transmission duration.',
    category: 'Multiple Access',
    related: ['CTS', 'CSMA/CA']
  },
  {
    word: 'Simplex',
    definition: 'A simple communication mode where data can only travel in one pre-configured direction (e.g. keyboard to computer).',
    category: 'Introduction',
    related: ['Half-Duplex', 'Full-Duplex']
  },
  {
    word: 'Sliding Window',
    definition: 'A flow control model where a sender is permitted to transmit a continuous set of frames defined by a window boundary before needing an ACK.',
    category: 'Data Link Control',
    related: ['Stop-and-Wait', 'Flow Control']
  },
  {
    word: 'TDMA (Time Division Multiple Access)',
    definition: 'A channelization method that assigns repeating, non-overlapping time slots to separate users on the same shared frequency bandwidth.',
    category: 'Multiple Access',
    related: ['FDMA', 'CDMA']
  },
  {
    word: 'Token',
    definition: 'A small, unique logical control packet that circulates around a network ring; a node must possess it to gain permission to send frames.',
    category: 'Multiple Access',
    related: ['Token Passing', 'Controlled Access']
  }
];
