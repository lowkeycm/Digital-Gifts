Owner correction, October 4: “Why would you remove the record page we had previously and think the templates you just did were a good replacement?” The reduced flat layouts were rejected. Restore the original record player from 9d1609a as the visual baseline in every option. Keep the functional corrections, exact customer note and complete photo. Use the original screenshot and existing project research; this is correction within the established art direction, not a new visual system. Original materials and play/arm behavior are preserved; photo framing and letter stationery add matched material depth.

Owner review amendment, October 4: use the explicitly requested $59 reference price with $29 Introductory highlighted. This supersedes the earlier introductory-only implementation. The user rejected repeated aspirational copy; controls now describe their action directly. The first template implementation was later rejected because it removed the custom player. The corrected templates all retain the original dimensional record player and layer the photo/note treatment around it. No new stock imagery or claims of conversion lift. Actual sharing actions reveal a reminder without asserting delivery.

# Premium song studio

Owner approved the October 3 checkout audit and delegated execution. Existing $29 price, two originals and three revisions remain authoritative. The October 4 owner review supersedes the prior introductory-only price display with an explicit $59/$29 offer. Public checkout remains free until explicit paid launch. No automatic marketing campaigns are activated.

Marketing-Hub Website System and six references, landing-page/build reference, direct-response copy and calibration anchors loaded at the recorded revision. Shared brand files resolved manually because the private Hub clone was unavailable; brand/assets.md is present, other profiles are absent. The approved audit supplies the buyer journey and offer. This is an existing most-aware checkout and purchased utility flow, not a cold-traffic landing-page rewrite. No invented customer VoC or measured conversion claims.

Selected direction: personal listening room. Cream product header over a navy acoustic wall; large serif recipient title; overlapping album sleeve and grooved vinyl with bronze label; one transport; ivory gift workbench. Desktop two-column layout, mobile player then current task, useful touch targets. Subtle entrance/playback motion with reduced-motion parity. No new identity, 3D navigation, fabricated waveform or recording controls. Artwork is authored CSS/SVG and the uploaded personal photo, not a stock portrait.

Research is scoped to the changed product interface. Reuse the live Wonderbly/Flowerdose/Songfinch and static mobile Superpower observations in docs/website-brief.md. Additional October 3 rendered research: Awwwards Flower Dose product upsell gallery; Godly redirected to Recent, whose 3D Vinyl Player gallery shows physical object layering; 21st ElevenLabs Audio Player shows version list plus shared transport. Gallery captures establish visual direction, not conversion performance or live 3D behavior.

Copy review, October 4: the owner’s specific rejection of filler supersedes the previous copy choices. Use “Choose a melody”, “Same lyrics. Two melodies”, “Unlock their song · $29”, “Personalize their gift” and “Continue to sharing”. Keep the recipient’s own note intact. The price, included revisions and optional $9 print are factual offer details, with no scarcity or performance claims. The gift page is a utility for receiving the gift, not another sales pitch.

Email recovery dependency: this project has no customer delivery email configuration. Implement a server-only Resend adapter and passwordless verification; device access and downloadable private link remain available. Do not claim email was sent if unavailable. External sending and domain setup require the owner's service configuration.

```website-contract
{
  "version": 1,
  "surface": "funnel",
  "request": "Approved checkout audit: build a premium digital studio, $29 introductory offer, relevant keepsake upsell, focused listening/preparing/sharing stages, later feedback, and return access.",
  "hub_revision": "911e97931fb0313bce0dd513afb9ece30f672719",
  "build_revision": "record-restored-d6e7d75024ad",
  "pages": [
    {
      "route": "/song/[id]",
      "kind": "funnel",
      "job": "Hear personal songs, purchase access, prepare and share a gift.",
      "sections": [
        "welcome",
        "listening-room",
        "gift-workbench",
        "return-access",
        "after-gifting"
      ]
    },
    {
      "route": "/my-songs",
      "kind": "utility",
      "job": "Return to saved songs and create the next gift.",
      "sections": [
        "library",
        "recovery"
      ]
    },
    {
      "route": "/song/[id]/keepsake",
      "kind": "funnel",
      "job": "Inspect the printable keepsake before optional purchase and download it after payment.",
      "sections": [
        "preview",
        "offer",
        "download"
      ]
    }
  ],
  "requirements": [
    {
      "id": "studio-flow",
      "route": "/song/[id]",
      "category": "composition",
      "sections": [
        "welcome",
        "gift-workbench",
        "after-gifting"
      ],
      "source": "user",
      "acceptance": "Customers see confirmation, choose a version, prepare and share. Feedback and reactions appear only after explicitly marking the gift given.",
      "implementation": "Three stages, contextual secondary revision disclosure and separate after-gifting state.",
      "status": "waived",
      "observation": "Walkthrough verified Listen / Prepare / Share, persisted choice/note, optional note saved before keepsake detour, and feedback hidden until gift given.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-share-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-share-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ],
      "user_waiver": {
        "quote": "The \"After the Gift section\" is hidden (No one is coming back to find that); This should be shown after the gift is sent as a reminder. Then when they return to the studio something they can obviously find.",
        "source": "Clay, October 4 review feedback in this conversation"
      }
    },
    {
      "id": "studio-depth",
      "route": "/song/[id]",
      "category": "depth",
      "sections": [
        "welcome",
        "listening-room",
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "The paid studio feels like a premium personal listening room, with visible physical depth beyond the heading.",
      "implementation": "Ink acoustic wall, lit record sleeve and vinyl, ivory workbench with inset borders and gold hardware.",
      "status": "pass",
      "observation": "Inspected navy acoustic wall, layered sleeve and grooved record, ivory task panel and compact secondary controls at desktop/mobile sizes.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-studio-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "studio-player",
      "route": "/song/[id]",
      "category": "motion",
      "sections": [
        "listening-room"
      ],
      "source": "user",
      "acceptance": "One accessible player controls the active version; playback motion stops on pause and reduced motion retains all controls.",
      "implementation": "Native audio engine, custom range/play/volume, record rotation only during playback.",
      "status": "pass",
      "observation": "Single actual audio player verified play/pause, version remount, 60-second unpaid clip, full paid recording, seek and reduced motion.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-studio-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "reduced-motion",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "studio-offer",
      "route": "/song/[id]",
      "category": "conversion",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "$29 introductory pricing, both versions, three revisions and gift page are clear before secure checkout.",
      "implementation": "Exact offer beside personal previews, no invented former price or scarcity.",
      "status": "pass",
      "observation": "Owner-directed $59 strike-through and highlighted $29 Introductory price appear beside the gift-oriented purchase action; included melodies/revisions/page remain clear.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-checkout-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "library-access",
      "route": "/my-songs",
      "category": "components",
      "sections": [
        "library",
        "recovery"
      ],
      "source": "user",
      "acceptance": "Customers can return to songs saved on this device, export a recovery link and request email access when a sender is configured.",
      "implementation": "HttpOnly device library plus verified passwordless customer access; truthful configured-state handling.",
      "status": "pass",
      "observation": "Verified device collection, downloadable private access, owner-key validation and truthful email-disabled copy. Configured-email identity/expiry/rate-limit gates pass controlled transport checks.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-library-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-library-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "keepsake-offer",
      "route": "/song/[id]/keepsake",
      "category": "imagery",
      "sections": [
        "preview",
        "offer",
        "download"
      ],
      "source": "user",
      "acceptance": "Customers inspect the personalized 8x10 PDF design and $9 optional offer; only verified paid orders receive the print file.",
      "implementation": "Shared vector design for preview/PDF with server-validated Checkout entitlements.",
      "status": "pass",
      "observation": "Inspected real personalized SVG and rasterized 8x10 PDF, fixed $9 offer, clear digital-only terms, skip option and verified paid-only download. Static TrueType lettering fixed blank PDF glyphs.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-keepsake-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-keepsake-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-lyric-render.png",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "review-pricing-copy",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "Show $59 crossed out and highlight $29 Introductory. Remove the requested filler and payment-check link; use a gift-oriented purchase CTA and describe the same lyrics with two melodies.",
      "implementation": "October 4 owner review corrections across checkout, studio and recipient preview.",
      "status": "pass",
      "observation": "Rendered checkout contains the $59 strike-through, highlighted $29 offer and Unlock their song action. Requested filler/payment-check control absent.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-checkout-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "review-playback-flow",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "Selecting a melody starts playback automatically. Revisions are present only in the selection step. The optional print offer appears before the continue action.",
      "implementation": "October 4 owner review corrections across checkout, studio and recipient preview.",
      "status": "pass",
      "observation": "Clicking a melody plays it without a second click; only one audio element. No revisions in Prepare/Share; print offer precedes Continue to sharing.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-prepare-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-prepare-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "review-draft-persistence",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "The uploaded photo, note, selected melody, template and preparation step survive the print detour and a reload. The recipient preview uses those choices.",
      "implementation": "October 4 owner review corrections across checkout, studio and recipient preview.",
      "status": "pass",
      "observation": "Uploaded photo Blob, exact note, chosen melody and template survive the print detour, return to Prepare and full browser reload.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-prepare-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-prepare-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "review-gift-templates",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "Provide Photo, Record and Letter layouts. Each displays For name, the exact personal note and song title without generic relationship commentary; photos remain fully visible.",
      "implementation": "Every option uses the original full turntable: occasion-colored record room, larger brass photo frame, or layered letter stationery. Real render thumbnails replace abstract placeholders.",
      "status": "pass",
      "observation": "Exact photo/note/song, unobscured photo and original dimensional player observed in all three styles. Maximum note length, tall image and no-photo states verified. User visual acceptance is still pending.",
      "evidence": [
        {
          "path": "../../docs/qa/gift-portrait-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-portrait-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-record-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-record-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-letter-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-letter-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "review-share-reminder",
      "route": "/song/[id]",
      "category": "components",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "After a sharing action show a reaction/feedback reminder with an obvious return link near the top of the studio. Copying or opening a share sheet never claims successful delivery.",
      "implementation": "October 4 owner review corrections across checkout, studio and recipient preview.",
      "status": "pass",
      "observation": "Copying the recipient link reveals the reminder and top return link, while gift-given remains unset. Explicit given state and return access survive reload.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-share-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-share-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "id": "preserve-record-production",
      "route": "/song/[id]",
      "category": "motion",
      "sections": [
        "gift-workbench"
      ],
      "source": "user",
      "acceptance": "Restore the original dimensional record player. Template choices must retain its wood cabinet, continuous metal tonearm, grooved moving vinyl and layered materials; the complete personal photo and note stay visible. Desktop and mobile render comparison to the original is required.",
      "implementation": "Restore original CSS/SVG turntable in every template; compose record room, framed photo room and stationery room around it. Preserve customer content and existing access/data flow.",
      "status": "pass",
      "observation": "Compared to the original 9d1609a render: complete cabinet/plinth, lacquered vinyl, metal arm and matching sleeve restored. Desktop and phone retain full photo outside the player, exact note, a coordinated brass transport and real scene thumbnails. Browser playback, tonearm return, keyboard seek and reduced motion passed for all three options.",
      "evidence": [
        {
          "path": "../../docs/qa/gift-record-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-record-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-letter-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-letter-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-portrait-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-portrait-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "reduced-motion",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-restoration-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    }
  ],
  "research": [
    {
      "source": "awwwards",
      "url": "https://www.awwwards.com/inspiration/products-upsell-page-flower-dose",
      "mode": "gallery",
      "observation": "Rendered product-specific additions, visible prices and clear close control. Adapt to one optional keepsake after purchase; avoid modal interruption of initial checkout. Existing live Flowerdose research reused.",
      "applies_to": [
        "studio-flow",
        "keepsake-offer"
      ],
      "evidence": [
        "brief.md"
      ]
    },
    {
      "source": "godly",
      "url": "https://recent.design/i/xiw8k05-3d-vinyl-player-experience",
      "mode": "gallery",
      "observation": "Rendered turntable, floating record and reflective physical plinth. Adapt physical layering and album object; orbit and glitch animation are not claimed verified.",
      "applies_to": [
        "studio-depth"
      ],
      "evidence": [
        "brief.md"
      ]
    },
    {
      "source": "21st.dev",
      "url": "https://21st.dev/@ElevenLabs/components/audio-player",
      "mode": "rendered",
      "observation": "Rendered compact version list and single shared transport. Adapt one active track, grouped seek/time/play controls. No source copied.",
      "applies_to": [
        "studio-player"
      ],
      "evidence": [
        "brief.md"
      ]
    }
  ],
  "assets": [
    {
      "path": "../../public/images/your-song-logo.webp",
      "role": "Supplied product identity",
      "status": "ready"
    },
    {
      "path": "../../src/components/StudioPlayer.tsx",
      "role": "Authored record, sleeve and transport demonstration",
      "status": "ready"
    },
    {
      "path": "../../src/lib/keepsake-art.ts",
      "role": "Actual printable keepsake artwork, shared preview/download design",
      "status": "ready"
    },
    {
      "path": "../../src/components/GiftTurntable.tsx",
      "role": "Original detailed turntable and continuous metal tonearm restored from 9d1609a",
      "status": "ready"
    }
  ],
  "prototype": {
    "route": "/song/[id]",
    "sections": [
      "welcome",
      "listening-room",
      "gift-workbench"
    ],
    "revision": "record-restored-d6e7d75024ad",
    "status": "pass",
    "observation": "Original record room restored and compared on desktop/mobile with the previous dimensional player. Material depth, sleeve, photo separation and play/arm behavior retained. Flat prior templates explicitly rejected by owner; not used as a quality benchmark.",
    "evidence": [
      {
        "path": "../../docs/qa/premium-studio-1440.jpg",
        "kind": "screenshot",
        "viewport": "desktop",
        "revision": "record-restored-d6e7d75024ad"
      },
      {
        "path": "../../docs/qa/premium-studio-390.jpg",
        "kind": "screenshot",
        "viewport": "mobile",
        "revision": "record-restored-d6e7d75024ad"
      },
      {
        "path": "../../docs/qa/premium-browser-evidence.json",
        "kind": "browser-log",
        "viewport": "desktop",
        "revision": "record-restored-d6e7d75024ad"
      },
      {
        "path": "../../docs/qa/gift-record-1440.jpg",
        "kind": "screenshot",
        "viewport": "desktop",
        "revision": "record-restored-d6e7d75024ad"
      },
      {
        "path": "../../docs/qa/gift-record-390.jpg",
        "kind": "screenshot",
        "viewport": "mobile",
        "revision": "record-restored-d6e7d75024ad"
      }
    ]
  },
  "reviews": [
    {
      "route": "/song/[id]",
      "status": "pass",
      "observation": "Original studio flow remains verified. Recipient redesign compared to original 9d1609a: full turntable construction retained in every style; matched photo framing, paper edges and brass transport. Exact customer content, full imagery and no generic commentary. User visual approval remains pending.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-studio-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-picker-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-picker-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/gift-restoration-evidence.json",
          "kind": "browser-log",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "route": "/my-songs",
      "status": "pass",
      "observation": "Personal collection, create-another action and clear browser-only return-access state.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-library-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-library-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    },
    {
      "route": "/song/[id]/keepsake",
      "status": "pass",
      "observation": "Actual framed preview, explicit digital-only $9 offer and paid download state; PDF separately rasterized.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-keepsake-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-keepsake-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "record-restored-d6e7d75024ad"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "record-restored-d6e7d75024ad"
        }
      ]
    }
  ],
  "limitations": []
}
```
