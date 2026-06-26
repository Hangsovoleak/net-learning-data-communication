/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

export const quizzesData: QuizQuestion[] = [
  // INTRODUCTION QUIZ
  {
    id: 'intro_q1',
    question: 'Which component of a data communication system defines the set of rules that govern data transmission?',
    options: ['Sender', 'Receiver', 'Transmission Medium', 'Protocol'],
    correctAnswer: 3,
    explanation: 'A protocol is a set of rules that govern data communications. It represents an agreement between the communicating devices.',
    category: 'introduction'
  },
  {
    id: 'intro_q2',
    question: 'In which transmission mode can both stations transmit and receive simultaneously?',
    options: ['Simplex', 'Half-Duplex', 'Full-Duplex', 'Multiplex'],
    correctAnswer: 2,
    explanation: 'In full-duplex mode, both stations can transmit and receive simultaneously, like a telephone call where both parties can talk at once.',
    category: 'introduction'
  },
  {
    id: 'intro_q3',
    question: 'A network where every device has a dedicated point-to-point link to every other device is using which physical topology?',
    options: ['Mesh', 'Star', 'Bus', 'Ring'],
    correctAnswer: 0,
    explanation: 'A mesh topology features dedicated point-to-point connections between every pair of devices, maximizing redundancy and resilience.',
    category: 'introduction'
  },
  {
    id: 'intro_q4',
    question: 'What is the primary function of the Data Link Layer in the OSI reference model?',
    options: [
      'Routing packets across multiple networks',
      'Translating bits into physical voltage pulses',
      'Organizing physical bits into logical frames and providing node-to-node delivery',
      'Managing user sessions and browser cache'
    ],
    correctAnswer: 2,
    explanation: 'The Data Link Layer is responsible for organizing the raw bitstream from the Physical Layer into distinct blocks called frames and ensuring reliable node-to-node delivery.',
    category: 'introduction'
  },
  {
    id: 'intro_q5',
    question: 'Which of the following is an example of a Simplex communication mode?',
    options: ['Walkie-talkie', 'Traditional Television Broadcast', 'Telephone conversation', 'Chat messaging app'],
    correctAnswer: 1,
    explanation: 'Traditional TV broadcasting is Simplex, because the station transmits signal in one direction, and the home antenna can only receive.',
    category: 'introduction'
  },
  {
    id: 'intro_q6',
    question: 'Which physical topology uses a central controller or hub to link all devices?',
    options: ['Ring', 'Bus', 'Star', 'Mesh'],
    correctAnswer: 2,
    explanation: 'In a star topology, each device has a dedicated point-to-point link to a central controller, usually called a switch or hub.',
    category: 'introduction'
  },
  {
    id: 'intro_q7',
    question: 'What is the standard unit of data at the Physical Layer (Layer 1)?',
    options: ['Frames', 'Packets', 'Segments', 'Bits'],
    correctAnswer: 3,
    explanation: 'The Physical Layer deals with raw bits (1s and 0s) transmitted over copper wires, optical cables, or wireless waves.',
    category: 'introduction'
  },
  {
    id: 'intro_q8',
    question: 'Which term describes a signal degradation where the strength of a signal falls off with distance over a medium?',
    options: ['Noise', 'Attenuation', 'Distortion', 'Crosstalk'],
    correctAnswer: 1,
    explanation: 'Attenuation means the loss of signal energy over distance due to resistance or absorption in the transmission medium.',
    category: 'introduction'
  },
  {
    id: 'intro_q9',
    question: 'Which layer of the TCP/IP suite directly corresponds to the Physical and Data Link layers of the OSI model?',
    options: ['Internet Layer', 'Transport Layer', 'Network Access Layer', 'Application Layer'],
    correctAnswer: 2,
    explanation: 'The TCP/IP Network Access Layer (or Link Layer) encompasses both the physical and data link layers of the OSI model.',
    category: 'introduction'
  },
  {
    id: 'intro_q10',
    question: 'Which of the following is NOT one of the five core elements of data communication?',
    options: ['Gateway Router', 'Transmission Medium', 'Sender', 'Protocol'],
    correctAnswer: 0,
    explanation: 'The five core components are Message, Sender, Receiver, Medium, and Protocol. A gateway router is a specific hardware device, not a fundamental element.',
    category: 'introduction'
  },

  // DATA LINK CONTROL (DLC) QUIZ
  {
    id: 'dlc_q1',
    question: 'What framing method inserts a special escape byte before data bytes that match the frame boundaries?',
    options: ['Bit Stuffing', 'Character Count', 'Byte Stuffing (Character Stuffing)', 'Hamming Spacing'],
    correctAnswer: 2,
    explanation: 'Byte stuffing (or character stuffing) inserts an ESC byte ahead of any data bytes that happen to match the flag or escape characters.',
    category: 'dlc'
  },
  {
    id: 'dlc_q2',
    question: 'In bit stuffing, what bit is automatically stuffed by the sender after seeing five consecutive 1s?',
    options: ['0', '1', 'No bit is stuffed', 'A parity bit'],
    correctAnswer: 0,
    explanation: 'To prevent the data payload from containing the flag sequence (01111110), the sender stuffs a 0-bit after every sequence of five consecutive 1s.',
    category: 'dlc'
  },
  {
    id: 'dlc_q3',
    question: 'What is the main drawback of the Stop-and-Wait ARQ protocol?',
    options: [
      'It requires massive buffer space on the receiver',
      'It is highly inefficient on channels with a long propagation delay',
      'It does not support error detection',
      'It requires the use of orthogonal code matrices'
    ],
    correctAnswer: 1,
    explanation: 'Since Stop-and-Wait requires waiting for an ACK after sending every single frame, it leaves the link completely idle during the round-trip propagation time, causing high inefficiency on high-delay links.',
    category: 'dlc'
  },
  {
    id: 'dlc_q4',
    question: 'Which mathematical technique divides a binary data block by a generator polynomial to find a remainder (FCS)?',
    options: ['Simple Parity Check', 'Two-Dimensional Parity', 'Checksum', 'Cyclic Redundancy Check (CRC)'],
    correctAnswer: 3,
    explanation: 'CRC uses modulo-2 binary division by a generator polynomial to produce a remainder, which is appended as the Frame Check Sequence (FCS) for error detection.',
    category: 'dlc'
  },
  {
    id: 'dlc_q5',
    question: 'How does sliding window flow control improve link utilization?',
    options: [
      'By sending data over multiple frequency bands simultaneously',
      'By allowing the sender to transmit multiple outstanding frames before receiving an acknowledgement',
      'By completely disabling error correction to speed up throughput',
      'By compressing frames'
    ],
    correctAnswer: 1,
    explanation: 'Sliding window protocols let the sender stream a continuous pipeline of frames up to a certain window size, keeping the physical pipe full without idling.',
    category: 'dlc'
  },
  {
    id: 'dlc_q6',
    question: 'What is the name of the technique where a receiver delays sending an ACK and attaches it to an outgoing data frame?',
    options: ['Piggybacking', 'Bit Stuffing', 'Multiplexing', 'Pipelining'],
    correctAnswer: 0,
    explanation: 'Piggybacking is the process of hooking an ACK value into a standard outgoing data frame to save overhead on bidirectional connections.',
    category: 'dlc'
  },
  {
    id: 'dlc_q7',
    question: 'If a frame is corrupted and a negative acknowledgement (NAK) is used, what does the NAK instruct the sender to do?',
    options: [
      'Stop sending data permanently',
      'Retransmit the specific corrupted frame immediately',
      'Adjust the sliding window size to zero',
      'Change the generator polynomial'
    ],
    correctAnswer: 1,
    explanation: 'A NAK (Negative Acknowledgement) reports that a specific frame was received with errors, requesting immediate retransmission of that frame.',
    category: 'dlc'
  },
  {
    id: 'dlc_q8',
    question: 'What is the sequence number range for a sliding window protocol with an m-bit sequence number field?',
    options: ['0 to m', '0 to 2^m - 1', '1 to 2^m', '0 to m^2'],
    correctAnswer: 1,
    explanation: 'With m bits for sequence numbers, the numbers loop in a range of 0 to 2^m - 1.',
    category: 'dlc'
  },
  {
    id: 'dlc_q9',
    question: 'A single parity check can reliably detect how many bit errors in a block?',
    options: ['Any number of errors', 'Only odd numbers of bit errors', 'Only even numbers of bit errors', 'Up to 32 burst errors'],
    correctAnswer: 1,
    explanation: 'A single parity bit can only detect an odd number of bit errors. If an even number of bits flip, the parity remains correct, making the error invisible.',
    category: 'dlc'
  },
  {
    id: 'dlc_q10',
    question: 'In sliding window, if the sender window size is 7, what is the maximum number of unacknowledged frames permitted?',
    options: ['3', '7', '8', '14'],
    correctAnswer: 1,
    explanation: 'The window size directly defines the maximum limit of outstanding (sent but not yet acknowledged) frames allowed at any point.',
    category: 'dlc'
  },

  // POINT-TO-POINT PROTOCOLS (PPP/HDLC) QUIZ
  {
    id: 'ppp_q1',
    question: 'Which of the following is a key difference between HDLC and PPP?',
    options: [
      'HDLC is character-oriented, while PPP is strictly analog-oriented',
      'PPP can carry packets from multiple network-layer protocols, while standard HDLC is single-protocol',
      'HDLC supports CHAP, while PPP only supports PAP',
      'PPP is only used in satellite links'
    ],
    correctAnswer: 1,
    explanation: 'PPP supports multiple network-layer protocols (IPv4, IPv6, etc.) on the same physical link using its Network Control Protocol (NCP) system, whereas HDLC only supports a single protocol.',
    category: 'ppp'
  },
  {
    id: 'ppp_q2',
    question: 'What is the function of the LCP (Link Control Protocol) in a PPP connection?',
    options: [
      'Configuring network layer IP addresses',
      'Routing packets across multiple physical hops',
      'Establishing, configuring, testing, and terminating the link connection',
      'Enforcing CSMA/CD collisions'
    ],
    correctAnswer: 2,
    explanation: 'LCP is the PPP sub-protocol responsible for link establishment, maintenance, parameter negotiations (like compression or authentication), and link termination.',
    category: 'ppp'
  },
  {
    id: 'ppp_q3',
    question: 'Which PPP authentication protocol performs a three-way handshake and never transmits the password in clear text?',
    options: ['PAP', 'CHAP', 'LCP', 'NCP'],
    correctAnswer: 1,
    explanation: 'CHAP (Challenge Handshake Authentication Protocol) uses a secure 3-way handshake (challenge, response, validation) using MD5 hashing, meaning passwords are never sent raw over the link.',
    category: 'ppp'
  },
  {
    id: 'ppp_q4',
    question: 'What is the size of the Flag field in both PPP and HDLC frames?',
    options: ['1 byte (8 bits)', '2 bytes (16 bits)', '4 bytes (32 bits)', '6 bytes (48 bits)'],
    correctAnswer: 0,
    explanation: 'The Flag field is exactly 1 byte (8 bits) with the fixed binary pattern 01111110 (0x7E).',
    category: 'ppp'
  },
  {
    id: 'ppp_q5',
    question: 'Why does the Address field in a standard PPP frame always contain the binary pattern 11111111 (0xFF)?',
    options: [
      'Because it represents a private IP address',
      'Because PPP is a point-to-point link, so every frame is essentially broadcast to the only other station',
      'Because PPP only supports multicast',
      'Because it is randomized'
    ],
    correctAnswer: 1,
    explanation: 'Since a point-to-point link only has one receiver, individual MAC addressing is redundant, so PPP defaults the Address field to the broadcast address 11111111 (0xFF).',
    category: 'ppp'
  },
  {
    id: 'ppp_q6',
    question: 'What is the role of Network Control Protocols (NCP) in PPP?',
    options: [
      'To discover physical MAC addresses',
      'To manage the physical hardware voltages',
      'To negotiate and configure network-layer protocols like IPv4 or IPv6',
      'To authenticate user passwords'
    ],
    correctAnswer: 2,
    explanation: 'PPP uses NCPs to bring up and configure parameters for specific network-layer protocols (such as IPCP for IPv4, IPv6CP for IPv6) over the established link.',
    category: 'ppp'
  },
  {
    id: 'ppp_q7',
    question: 'In HDLC, which frame type is used to carry user data?',
    options: ['S-Frames (Supervisory)', 'U-Frames (Unnumbered)', 'I-Frames (Information)', 'A-Frames (Address)'],
    correctAnswer: 2,
    explanation: 'I-Frames (Information Frames) are designed to carry actual payload data from the network layer, and can piggyback flow and error control data.',
    category: 'ppp'
  },
  {
    id: 'ppp_q8',
    question: 'What does the FCS field stand for and what is its size in standard PPP frames?',
    options: [
      'Flow Control Segment, 1 byte',
      'Frame Check Sequence, 2 or 4 bytes',
      'Fiber Cable Selector, 8 bytes',
      'File Confirmation Stream, 1 byte'
    ],
    correctAnswer: 1,
    explanation: 'FCS stands for Frame Check Sequence, and is usually a 2-byte (16-bit) or 4-byte (32-bit) CRC checksum used to verify frame integrity.',
    category: 'ppp'
  },
  {
    id: 'ppp_q9',
    question: 'Which PPP authentication protocol is highly insecure due to sending passwords in clear text?',
    options: ['CHAP', 'PAP', 'EAP-TLS', 'WPA3'],
    correctAnswer: 1,
    explanation: 'PAP (Password Authentication Protocol) is insecure because the client sends username and password in plain text, making it vulnerable to packet sniffer attacks.',
    category: 'ppp'
  },
  {
    id: 'ppp_q10',
    question: 'What is the typical sequence of phases in a PPP link lifecycle?',
    options: [
      'Link Establish -> Authenticate -> Network Layer Config -> Link Open -> Link Terminate',
      'Authenticate -> Link Establish -> Link Terminate',
      'Network Layer Config -> Authenticate -> Link Establish',
      'Link Open -> Link Terminate -> Authenticate'
    ],
    correctAnswer: 0,
    explanation: 'A PPP link starts at Link Establish (LCP negotiation), moves to optional Authentication (PAP/CHAP), configures Network protocols (NCP), becomes open for user traffic, and terminates via LCP.',
    category: 'ppp'
  },

  // MULTIPLE ACCESS QUIZ
  {
    id: 'ma_q1',
    question: 'What is the maximum theoretical efficiency of the Pure ALOHA protocol?',
    options: ['18.4%', '36.8%', '50.0%', '100%'],
    correctAnswer: 0,
    explanation: 'The maximum throughput of Pure ALOHA is S = 1/(2e) which equals approximately 18.4% (at G = 0.5 offered load).',
    category: 'multiple-access'
  },
  {
    id: 'ma_q2',
    question: 'Why does Slotted ALOHA have double the maximum efficiency of Pure ALOHA?',
    options: [
      'Because it uses frequency division',
      'Because it forces stations to only transmit at the start of synchronized time slots, cutting the vulnerable interval in half',
      'Because it detects collisions immediately',
      'Because it uses token passing'
    ],
    correctAnswer: 1,
    explanation: 'By grouping time into strict slots, Slotted ALOHA reduces the collision vulnerability window from 2T (Pure ALOHA) to 1T, doubling maximum throughput to 36.8%.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q3',
    question: 'What does "CSMA/CD" stand for?',
    options: [
      'Carrier Sense Multiple Access with Collision Detection',
      'Carrier Signal Multiplexing and Code Division',
      'Cable Security Management and Collision Avoidance',
      'Channelized Selection Multiple Access and Data control'
    ],
    correctAnswer: 0,
    explanation: 'CSMA/CD stands for Carrier Sense Multiple Access with Collision Detection, which is the protocol traditionally used in wired Ethernet (802.3).',
    category: 'multiple-access'
  },
  {
    id: 'ma_q4',
    question: 'In CSMA/CA, how do stations attempt to avoid collisions altogether on a wireless medium?',
    options: [
      'By using physical shield blocks',
      'By sending a Request to Send (RTS) and waiting for a Clear to Send (CTS) frame from the Access Point',
      'By only transmitting during even seconds of the clock',
      'By using unique mathematical spreading codes'
    ],
    correctAnswer: 1,
    explanation: 'CSMA/CA (Collision Avoidance) uses RTS/CTS handshakes along with Inter-Frame Spacings (IFS) and random backoff windows to negotiate access to the shared wireless channel before transmitting.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q5',
    question: 'In which controlled access method does a master station invite slave stations to transmit data one by one?',
    options: ['Reservation', 'Polling', 'Token Passing', 'CSMA/CD'],
    correctAnswer: 1,
    explanation: 'In Polling, a central primary node polls secondary nodes in a round-robin style, inviting them to send data only when prompted.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q6',
    question: 'Which multiple access category divides the shared channel bandwidth into distinct, non-overlapping frequency bands?',
    options: ['TDMA', 'FDMA', 'CDMA', 'CSMA'],
    correctAnswer: 1,
    explanation: 'FDMA (Frequency Division Multiple Access) allocates dedicated, separate frequency bands to each individual user on a continuous basis.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q7',
    question: 'Which technology allows multiple users to transmit simultaneously over the exact same frequency and time slot using orthogonal codes?',
    options: ['TDMA', 'FDMA', 'CDMA', 'Slotted ALOHA'],
    correctAnswer: 2,
    explanation: 'CDMA (Code Division Multiple Access) lets all users share the entire channel bandwidth simultaneously by modulating each user signal with a unique orthogonal mathematical code.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q8',
    question: 'What is the role of the "Jam Signal" in a CSMA/CD network?',
    options: [
      'To freeze the receiver screen',
      'To alert all stations on the cable that a collision has occurred, ensuring they discard the current frame and start backoff timers',
      'To scramble passwords',
      'To speed up transmission rates'
    ],
    correctAnswer: 1,
    explanation: 'When a transmitting station detects a collision, it sends a continuous "jam signal" to ensure all other active stations notice the collision and reset immediately.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q9',
    question: 'In Token Passing, what happens if a station has no data to transmit when it receives the token?',
    options: [
      'It deletes the token',
      'It halts the entire network',
      'It immediately forwards the token to the next downstream node',
      'It sends dummy packets'
    ],
    correctAnswer: 2,
    explanation: 'If a station receives the token but has no outgoing data frames, it immediately passes the token along to its neighbor in the logical ring to keep communications moving.',
    category: 'multiple-access'
  },
  {
    id: 'ma_q10',
    question: 'What is "exponential backoff" in collision-based networks?',
    options: [
      'A method to double the power of the signal',
      'An algorithm that exponentially increases the range of the random wait time after consecutive collisions to resolve congestion',
      'A hardware cooling protocol',
      'A mathematical compression algorithm'
    ],
    correctAnswer: 1,
    explanation: 'Exponential backoff dynamically increases the size of the slot selection window after successive collisions, reducing the probability of stations retrying at the same time.',
    category: 'multiple-access'
  }
];
