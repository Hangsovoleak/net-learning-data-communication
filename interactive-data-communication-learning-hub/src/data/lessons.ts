/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson, Flashcard } from '../types';

export const lessonsData: Lesson[] = [
  {
    id: 'introduction',
    title: 'Introduction to Data Communication',
    subtitle: 'The foundation of transmitting bits across space and time.',
    description: 'Learn the basic components, physical media, network topologies, and layered protocols that govern modern information transfer.',
    icon: 'Radio',
    difficulty: 'Beginner',
    estimatedTime: '15 mins',
    definition: 'Data Communication is the exchange of data (in the form of bits) between two devices via some form of transmission medium (such as a wire, cable, or wireless channel).',
    purpose: 'To safely, efficiently, and reliably transfer binary information from a sender to a receiver over physical distances without corruption or loss.',
    whyItMatters: 'Every email you send, movie you stream, and website you load relies on these underlying physical and logical mechanisms to cross physical space.',
    analogy: {
      title: 'Sending a Letter via Postal Service',
      explanation: 'Your letter (Data) is written in a language (Protocol), put inside an envelope with source and destination addresses (Framing/Addressing), and transported by trucks or planes (Transmission Medium) through multiple sorting hubs before arriving at the destination inbox.',
      icon: 'Mail'
    },
    sections: [
      {
        id: 'components',
        title: 'Five Key Components of Data Communication',
        content: 'Data communication systems comprise five essential parts working in unison:',
        keyPoints: [
          'Message: The information (data) to be communicated (text, numbers, images, audio, video).',
          'Sender: The device that sends the data message (computer, workstation, telephone, video camera).',
          'Receiver: The device that receives the message.',
          'Transmission Medium: The physical path by which a message travels from sender to receiver (twisted-pair cable, coaxial cable, fiber-optic cable, radio waves).',
          'Protocol: A set of rules that govern data communication. It represents an agreement between the communicating devices.'
        ]
      },
      {
        id: 'modes',
        title: 'Data Flow Directions (Simplex, Half-Duplex, Full-Duplex)',
        content: 'Data transmission between two devices can occur in three distinct directions:',
        keyPoints: [
          'Simplex: One-way communication. Only one device can transmit; the other can only receive (e.g., traditional television broadcast, keyboard input).',
          'Half-Duplex: Two-way communication, but not at the same time. Each device can transmit and receive, but only one at a time (e.g., Walkie-talkies).',
          'Full-Duplex: Simultaneous two-way communication. Both stations can transmit and receive at the exact same time (e.g., telephone call, high-speed fiber internet).'
        ]
      },
      {
        id: 'categories',
        title: 'Physical Topology Configurations',
        content: 'The topology of a network defines how devices are physically connected to one another:',
        keyPoints: [
          'Mesh Topology: Every device has a dedicated point-to-point link to every other device, providing maximum redundancy and fault tolerance.',
          'Star Topology: Every device is connected to a central controller (Hub or Switch). Robust, easy to install and reconfigure, but represents a single point of failure.',
          'Bus Topology: All devices are linked via a single continuous cable (the backbone). Easy to install, but a break in the backbone halts all communication.',
          'Ring Topology: Each device has a dedicated point-to-point connection with only the two devices on either side, forming a closed loop.'
        ]
      }
    ],
    advantages: [
      'Enables global resource sharing and high-speed collaboration.',
      'Highly scalable physical topologies can adapt to local and global scales.',
      'Standardized open protocols ensure hardware compatibility across manufacturers.'
    ],
    disadvantages: [
      'Vulnerable to security threats, eavesdropping, and cyber attacks.',
      'Signal attenuation, noise, and electromagnetic interference degrade long-distance transmission.',
      'High initial setup costs for high-bandwidth fiber-optic networks.'
    ],
    applications: [
      'High-speed Fiber Broadband and Mobile networks (LTE / 5G).',
      'Satellite internet and GPS location services.',
      'Corporate and academic Local Area Networks (LANs).'
    ]
  },
  {
    id: 'dlc',
    title: 'Data Link Control (DLC)',
    subtitle: 'Managing flow, framing, and errors over a single node-to-node link.',
    description: 'Deep dive into how bits are grouped into frames, flow is regulated, and transmission errors are detected and corrected.',
    icon: 'Layers',
    difficulty: 'Intermediate',
    estimatedTime: '25 mins',
    definition: 'Data Link Control represents the set of procedures and functions that govern the communication between two adjacent nodes on a network, operating at the Data Link Layer (OSI Layer 2).',
    purpose: 'To convert a raw, unreliable physical transmission line into a clean, reliable, error-free point-to-point link.',
    whyItMatters: 'Physical media naturally introduces noise, signal fade, and packet collisions. Without DLC, every corrupted bit would ruin the entire file transfer, requiring complete retransmission.',
    analogy: {
      title: 'A Careful Dictation Assistant',
      explanation: 'When speaking into a transcription machine, you pause to ask "Did you get that?" (Flow Control), spell out difficult words to double-check spelling (Error Control), and group sentences into coherent paragraphs (Framing) to ensure the message is perfectly transcribed.',
      icon: 'Megaphone'
    },
    sections: [
      {
        id: 'responsibilities',
        title: 'Core DLC Responsibilities',
        content: 'To achieve reliable node-to-node delivery, the Data Link Layer takes on three essential responsibilities:',
        keyPoints: [
          'Framing: Packing the bitstream from the physical layer into distinct logical blocks called frames. This involves adding headers, trailers, and addressing.',
          'Flow Control: Regulating the rate of data transfer so a fast sender does not overwhelm a slow receiver, avoiding buffer overflows.',
          'Error Control: Detecting and correcting transmission errors (such as flipped bits or completely lost frames).'
        ]
      },
      {
        id: 'framing',
        title: 'Framing Techniques',
        content: 'Framing establishes the boundaries of each frame using specialized methods:',
        keyPoints: [
          'Character Count: A header field specifies the total number of characters in the frame. (Risk: If the count gets corrupted, all subsequent frames are misaligned).',
          'Byte Stuffing: Placing a special Escape byte before any data bytes that happen to match the reserved Flag boundaries.',
          'Bit Stuffing: Appending a Flag byte (01111110) to start and end frames. To prevent data from accidentally containing this Flag, the sender automatically inserts a 0-bit after any sequence of five consecutive 1-bits.'
        ]
      },
      {
        id: 'error_control',
        title: 'Error Detection & Correction',
        content: 'Noise on communication cables can flip a 1 to a 0 or vice versa. We need mechanisms to protect our data:',
        keyPoints: [
          'Simple Parity Check: Appending a single redundant bit to make the total number of 1s even (Even Parity) or odd (Odd Parity). (Only catches single-bit errors).',
          'Checksum: Summing data segments in binary and appending the ones-complement sum. Commonly used in network headers (IP, TCP).',
          'Cyclic Redundancy Check (CRC): A powerful mathematical division technique where the sender divides data by a generator polynomial and appends the remainder (FCS). Can catch burst errors with near-100% reliability.'
        ]
      },
      {
        id: 'protocols',
        title: 'Flow Control Protocols',
        content: 'These protocols coordinate data pacing and acknowledgements:',
        keyPoints: [
          'Stop-and-Wait ARQ: The sender transmits one frame and must wait for an Acknowledgement (ACK) before sending the next. Simple, but highly inefficient for high-latency lines.',
          'Sliding Window ARQ: Multiple frames can be transmitted in a continuous pipeline without waiting for individual ACKs. A "window" defines the maximum number of outstanding unacknowledged frames.',
          'Piggybacking: An optimization where the ACK is embedded inside the header of an outgoing data frame travelling in the opposite direction, saving transmission overhead.'
        ]
      }
    ],
    advantages: [
      'Guarantees error-free delivery over noisy physical connections.',
      'Coordinates transmission rates between devices of varying speeds.',
      'Maintains data order via sequence numbering.'
    ],
    disadvantages: [
      'Introduces network overhead with extra headers, trailers, and ACK packets.',
      'Increases latency due to processing divisions, checksum calculations, and retransmission timeouts.',
      'Complex buffering requirements for sliding window protocols.'
    ],
    applications: [
      'Ethernet (IEEE 802.3) frame formatting and error detection.',
      'Wi-Fi (IEEE 802.11) node-to-node acknowledgements and framing.',
      'Fiber-optic link flow regulations.'
    ]
  },
  {
    id: 'ppp',
    title: 'Point-to-Point Protocols',
    subtitle: 'PPP and HDLC for direct link communication.',
    description: 'Study the two standard protocols used to connect directly adjacent nodes, including frame breakdowns, link negotiation, and PAP vs CHAP authentication.',
    icon: 'Zap',
    difficulty: 'Intermediate',
    estimatedTime: '20 mins',
    definition: 'Point-to-Point Protocols are logical conventions (specifically PPP and HDLC) designed to transfer data packets between exactly two physically connected nodes without any routers in between.',
    purpose: 'To establish direct, secure, and authenticated data link communication over physical leased lines, optical links, or dial-up circuits.',
    whyItMatters: 'Point-to-point protocols serve as the backbone links connecting major internet routing centers and telecommunication service providers to individual homes and business hubs.',
    analogy: {
      title: 'A Private Dedicated Phone Line',
      explanation: 'A private phone line connecting a remote bank branch directly to the headquarters. Before data is spoken, both parties verify their security credentials (Authentication) and agree on the format of details (Link Control), then maintain a strict structure for every word.',
      icon: 'PhoneCall'
    },
    sections: [
      {
        id: 'hdlc',
        title: 'High-Level Data Link Control (HDLC)',
        content: 'HDLC is a bit-oriented protocol developed by ISO that provides both connectionless and connection-oriented services over point-to-point and multipoint links:',
        keyPoints: [
          'Transfer Modes: Normal Response Mode (NRM) for unbalanced configurations, and Asynchronous Balanced Mode (ABM) for symmetric peer-to-peer setups.',
          'Frame Types: Information Frames (I-frames) to transport user data, Supervisory Frames (S-frames) for flow and error control (ACK/NAK), and Unnumbered Frames (U-frames) for link management.'
        ]
      },
      {
        id: 'ppp_details',
        title: 'Point-to-Point Protocol (PPP)',
        content: 'PPP is the dominant internet protocol for direct links, addressing HDLC limitations. It operates through three main mechanisms:',
        keyPoints: [
          'Framing: Defining frame structures with character stuffing for software links.',
          'Link Control Protocol (LCP): Responsible for establishing, configuring, testing, and terminating the link, as well as negotiating data compression and authentication options.',
          'Network Control Protocols (NCP): Multiple protocols used to establish and configure different network-layer protocols (such as IPv4, IPv6, or AppleTalk) over the same PPP connection.'
        ]
      },
      {
        id: 'authentication',
        title: 'PPP Authentication: PAP vs CHAP',
        content: 'Security is paramount over direct links. PPP supports two major password verification protocols:',
        keyPoints: [
          'PAP (Password Authentication Protocol): A simple, insecure, two-way handshake. The client sends user credentials in plain text over the line. (Vulnerable to eavesdropping).',
          'CHAP (Challenge Handshake Authentication Protocol): A secure, three-way handshake. The server sends a random Challenge string. The client hashes the challenge with their shared secret and sends the hash back. The password is never sent over the cable.'
        ]
      }
    ],
    advantages: [
      'PPP supports multi-protocol payloads (IPv4, IPv6, etc.) on a single physical link.',
      'CHAP provides robust, periodic, dynamic authentication to block spoofing attacks.',
      'Excellent loopback testing and error diagnostic capabilities via LCP.'
    ],
    disadvantages: [
      'PPP has no built-in flow control and relies completely on the transport layer (TCP).',
      'Bit/Byte stuffing increases bandwidth usage unpredictably based on the payload data.',
      'HDLC is largely vendor-proprietary, reducing interoperability.'
    ],
    applications: [
      'DSL Broadband internet delivery (PPPoE - PPP over Ethernet).',
      'Connecting routers directly over high-speed leased WAN lines (T1/E1, SONET/SDH).',
      'Direct fiber-optic connections.'
    ]
  },
  {
    id: 'multiple-access',
    title: 'Multiple Access Protocols',
    subtitle: 'Coordinating sharing when many devices use the same wire or airwaves.',
    description: 'Explore the protocols that resolve collisions on shared media, spanning Random Access (ALOHA, CSMA/CD, CSMA/CA), Controlled Access, and Channelization.',
    icon: 'Network',
    difficulty: 'Advanced',
    estimatedTime: '30 mins',
    definition: 'Multiple Access Protocols are set guidelines that dictate how multiple independent network devices share a single common, broadcast-style transmission medium (like Wi-Fi frequency bands or shared coaxial cables).',
    purpose: 'To organize and regulate media sharing, minimize or eliminate packet collisions, and distribute available bandwidth fairly among all active nodes.',
    whyItMatters: 'If two Wi-Fi devices talk at the exact same instant on the same channel, their radio waves collide and create gibberish noise. Multiple Access is the traffic controller preventing wireless chaos.',
    analogy: {
      title: 'A Busy Classroom Discussion',
      explanation: 'If everyone in a classroom shouts out answers simultaneously, nobody is understood (Collision). Students can either speak at random times and apologize/repeat (ALOHA), listen if anyone else is speaking before talking (CSMA), raise hands to be called on (Reservation/Polling), or pass a "talking stick" around (Token Passing).',
      icon: 'Users'
    },
    sections: [
      {
        id: 'random_access',
        title: 'Random Access Protocols',
        content: 'In random access, no station is superior, and no station is assigned a specific time slot or channel to transmit. Nodes transmit when they have data, dealing with collisions reactively:',
        keyPoints: [
          'Pure ALOHA: Devices transmit immediately when they have a packet. If a collision occurs, they wait a random amount of time and try again. Max efficiency is only 18.4%.',
          'Slotted ALOHA: Time is divided into strict slots. Devices can only transmit at the beginning of a slot. Max efficiency doubles to 36.8%.',
          'CSMA (Carrier Sense Multiple Access): "Listen Before Talk". Nodes check if the medium is idle. If idle, they transmit.',
          'CSMA/CD (Collision Detection): CSMA with a collision detection mechanism. If two nodes talk together, they immediately stop, send a "jam signal", wait a random backoff time, and retry. Used in wired Ethernet.',
          'CSMA/CA (Collision Avoidance): CSMA optimized for wireless (Wi-Fi). Because wireless cards cannot listen while transmitting, they send Request to Send (RTS) and wait for Clear to Send (CTS) to avoid collisions entirely.'
        ]
      },
      {
        id: 'controlled_access',
        title: 'Controlled Access Protocols',
        content: 'These protocols guarantee that only one authorized station transmits at a time, completely eliminating collisions:',
        keyPoints: [
          'Reservation: Stations must reserve a time slot in a frame beforehand using reservation bit intervals.',
          'Polling: A primary (master) node sequentially queries secondary (slave) nodes to ask if they have data. Active nodes only send data when invited.',
          'Token Passing: A small special control packet (the Token) is passed in a logical ring. A node can only transmit data when it holds the Token. Extremely reliable under heavy loads (e.g., Token Ring).'
        ]
      },
      {
        id: 'channelization',
        title: 'Channelization Protocols',
        content: 'These multiplexing protocols divide the shared medium bandwidth by frequency, time, or unique mathematical codes:',
        keyPoints: [
          'FDMA (Frequency Division Multiple Access): The total bandwidth is sliced into distinct, non-overlapping frequency bands assigned to separate users.',
          'TDMA (Time Division Multiple Access): Users share the entire frequency band but are assigned repeating, non-overlapping time slots to transmit.',
          'CDMA (Code Division Multiple Access): Users transmit simultaneously over the exact same frequency band and time, but their data is multiplied by unique orthogonal mathematical codes, allowing receivers to cleanly extract individual signals.'
        ]
      }
    ],
    advantages: [
      'Allows hundreds of devices to share a single physical medium seamlessly.',
      'Controlled Access and Channelization guarantee collision-free transfers under high traffic loads.',
      'CSMA/CD maximizes performance on wired copper lines.'
    ],
    disadvantages: [
      'Random access protocols suffer heavy performance degradation and bandwidth waste under high congestion.',
      'Token passing and Polling suffer from high overhead and single point of failures (e.g., master node or lost token).',
      'Channelization requires complex hardware synchronization and filters.'
    ],
    applications: [
      'Wi-Fi (IEEE 802.11) using CSMA/CA protocol.',
      'Traditional Ethernet (switched / hub) using CSMA/CD.',
      'Cellular Communications (2G/3G used TDMA/CDMA, 4G/5G use OFDMA).'
    ]
  },
  {
    id: 'revision-notes',
    title: 'Revision & Cheat Sheets',
    subtitle: 'The full curriculum summarized in neat, high-density study blocks.',
    description: 'A comprehensive cheat sheet summarizing the differences, frame dimensions, formulas, and critical concepts across all network models.',
    icon: 'FileText',
    difficulty: 'Beginner',
    estimatedTime: '10 mins',
    definition: 'Revision Notes are condensed conceptual blueprints designed to help students quickly recall key formulas, frame formats, and architectural differences before exams.',
    purpose: 'To provide a high-density, centralized repository of data communication facts and comparative tables for fast learning and review.',
    whyItMatters: 'Studying protocols side-by-side consolidates understanding of why certain architectural trade-offs were made (e.g. why Wi-Fi uses collision avoidance while Ethernet uses collision detection).',
    analogy: {
      title: 'A Quick Reference Cookbook',
      explanation: 'Rather than reading a whole textbook on culinary chemistry, a chef references a quick table of temperatures, measurements, and cooking times to execute a complex recipe perfectly.',
      icon: 'BookOpen'
    },
    sections: [
      {
        id: 'formula_sheet',
        title: 'Critical Formulas & Limits',
        content: 'A summary of mathematical formulas governing channel capacity and protocol efficiencies:',
        keyPoints: [
          'Shannon Capacity: C = B * log2(1 + SNR). Determines maximum theoretical data rate of a noisy channel.',
          'Nyquist Bit Rate: BitRate = 2 * Bandwidth * log2(L). Determines maximum rate for a noiseless channel.',
          'Pure ALOHA Efficiency: S_max = 1 / (2e) ≈ 18.4% (occurs at G = 0.5).',
          'Slotted ALOHA Efficiency: S_max = 1 / e ≈ 36.8% (occurs at G = 1.0).',
          'Stop-and-Wait Efficiency: U = 1 / (1 + 2a), where a = PropagationTime / TransmissionTime.'
        ]
      },
      {
        id: 'layered_architecture',
        title: 'OSI vs TCP/IP Layer Mapping',
        content: 'Understand where protocols live within standard network stacks:',
        keyPoints: [
          'Layer 4 (Transport): TCP, UDP (Processes end-to-end reliability and port-to-port connections).',
          'Layer 3 (Network): IP, ICMP, ARP (Directs packet routing across multiple logical network networks).',
          'Layer 2 (Data Link): DLC, PPP, HDLC, Ethernet, Wi-Fi MAC (Translates physical bits to logical frames, node-to-node).',
          'Layer 1 (Physical): Coaxial, Fiber Optic, Radio Waves, Cat6 Cables (Transmits raw binary electrical/optical pulses).'
        ]
      }
    ],
    advantages: [
      'High-density format facilitates rapid scanning and self-testing.',
      'Saves preparation time before exams or technical interviews.',
      'Clarifies complex relationships through visual, comparative analysis.'
    ],
    disadvantages: [
      'Omits step-by-step mathematical derivations.',
      'Relies on prior conceptual understanding to be fully beneficial.',
      'Simplified models may hide specific vendor implementation details.'
    ],
    applications: [
      'Pre-exam cram sessions for computer networking students.',
      'Technical interview preparation for network administrators and engineers.',
      'Fast reference guide for configuring real router ports.'
    ]
  }
];

export const flashcardsData: Flashcard[] = [
  // Introduction
  {
    id: 'f1',
    front: 'What are the five core components of a data communication system?',
    back: '1. Message (Data)\n2. Sender (Source)\n3. Receiver (Destination)\n4. Transmission Medium (Cable/Wireless)\n5. Protocol (Rules)',
    category: 'introduction'
  },
  {
    id: 'f2',
    front: 'Explain the difference between Half-Duplex and Full-Duplex.',
    back: 'Half-Duplex allows two-way communication but only one device can transmit at a time (e.g. Walkie-talkie). Full-Duplex allows both devices to transmit and receive simultaneously (e.g. Telephone).',
    category: 'introduction'
  },
  {
    id: 'f3',
    front: 'Which topology provides the highest level of redundancy?',
    back: 'Mesh Topology, because every node is connected to every other node with a dedicated point-to-point physical connection.',
    category: 'introduction'
  },
  // DLC
  {
    id: 'f4',
    front: 'What is bit stuffing and why is it used?',
    back: 'Bit stuffing is a framing method. The sender adds a 0 bit after five consecutive 1s in the data stream so that the data is never confused with the starting/ending Flag (01111110).',
    category: 'dlc'
  },
  {
    id: 'f5',
    front: 'What is the key difference between Flow Control and Error Control?',
    back: 'Flow Control prevents a fast sender from overwhelming a slow receiver buffer. Error Control detects and corrects bit flips or lost frames during transmission.',
    category: 'dlc'
  },
  {
    id: 'f6',
    front: 'What is Piggybacking?',
    back: 'An optimization where a receiver includes its Acknowledgement (ACK) value inside the header of an outgoing data frame going in the opposite direction, rather than sending a separate ACK frame.',
    category: 'dlc'
  },
  {
    id: 'f7',
    front: 'How does Stop-and-Wait ARQ handle lost frames?',
    back: 'The sender starts a timer after transmitting. If no ACK is received before the timer expires, the sender assumes the frame or ACK was lost and retransmits.',
    category: 'dlc'
  },
  // PPP
  {
    id: 'f8',
    front: 'What are LCP and NCP in the Point-to-Point Protocol (PPP)?',
    back: 'LCP (Link Control Protocol) establishes, configures, and tests the physical link. NCP (Network Control Protocol) configures different network layer protocols (like IPv4, IPv6) over the PPP link.',
    category: 'ppp'
  },
  {
    id: 'f9',
    front: 'Why is CHAP more secure than PAP?',
    back: 'PAP sends the password in clear text over the link (2-way handshake). CHAP never transmits the password; it uses a 3-way challenge-response with MD5 hashing (dynamic challege).',
    category: 'ppp'
  },
  {
    id: 'f10',
    front: 'What is the default flag value in PPP and HDLC frames?',
    back: '01111110 (or 0x7E in hexadecimal). It denotes the start and finish boundaries of the frame.',
    category: 'ppp'
  },
  // Multiple Access
  {
    id: 'f11',
    front: 'What is the difference between Pure ALOHA and Slotted ALOHA?',
    back: 'In Pure ALOHA, stations transmit anytime they want (18.4% max efficiency). In Slotted ALOHA, time is synchronized into slots, and stations can only transmit at the start of a slot (36.8% max efficiency).',
    category: 'multiple-access'
  },
  {
    id: 'f12',
    front: 'Why is CSMA/CD not used on wireless (Wi-Fi) networks?',
    back: 'In wireless, a device cannot listen for collisions while transmitting due to the high difference between send and receive signal power. Thus, CSMA/CA (Collision Avoidance) is used instead.',
    category: 'multiple-access'
  },
  {
    id: 'f13',
    front: 'Explain Token Passing controlled access.',
    back: 'A special token frame circulates around a logical ring. A station can only transmit data frames if it currently possesses the token, entirely preventing collisions.',
    category: 'multiple-access'
  },
  {
    id: 'f14',
    front: 'How does CDMA differ from TDMA and FDMA?',
    back: 'FDMA splits users by frequency channels. TDMA splits users by time slots. CDMA allows all users to transmit at the same time and frequency, using unique mathematical codes (orthogonal spreading sequences).',
    category: 'multiple-access'
  }
];
