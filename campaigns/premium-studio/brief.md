# Premium song studio

Owner approved the October 3 checkout audit and delegated execution. Existing $29 price, two originals and three revisions remain authoritative. $59 has no established regular-price history, so use introductory pricing. Public checkout remains free until explicit paid launch. No automatic marketing campaigns are activated.

Marketing-Hub Website System and six references, landing-page/build reference, direct-response copy and calibration anchors loaded at the recorded revision. Shared brand files resolved manually because the private Hub clone was unavailable; brand/assets.md is present, other profiles are absent. The approved audit supplies the buyer journey and offer. This is an existing most-aware checkout and purchased utility flow, not a cold-traffic landing-page rewrite. No invented customer VoC or measured conversion claims.

Selected direction: personal listening room. Cream product header over a navy acoustic wall; large serif recipient title; overlapping album sleeve and grooved vinyl with bronze label; one transport; ivory gift workbench. Desktop two-column layout, mobile player then current task, useful touch targets. Subtle entrance/playback motion with reduced-motion parity. No new identity, 3D navigation, fabricated waveform or recording controls. Artwork is authored CSS/SVG and the uploaded personal photo, not a stock portrait.

Research is scoped to the changed product interface. Reuse the live Wonderbly/Flowerdose/Songfinch and static mobile Superpower observations in docs/website-brief.md. Additional October 3 rendered research: Awwwards Flower Dose product upsell gallery; Godly redirected to Recent, whose 3D Vinyl Player gallery shows physical object layering; 21st ElevenLabs Audio Player shows version list plus shared transport. Gallery captures establish visual direction, not conversion performance or live 3D behavior.

Copy review: existing flow scored 42/70 in approved audit. Selected purchase copy: “Make their first listen a moment.” / “Keep both full songs, then make a personal gift page for them.” / “$29 introductory price” / “Keep my songs”. Paid copy: “Your songs are yours to keep.” / “Choose the version you want them to hear.” Supporting facts remain beside the purchase. Editorial scores: clarity9 specificity8 voice8 desire8 proof9 urgency7 flow9 =58/70. Urgency comes from finishing the gift for its occasion, with no countdown or scarcity claim. This is an editorial judgment, not measured conversion. No A/B routes without an agreed competing offer.

Email recovery dependency: this project has no customer delivery email configuration. Implement a server-only Resend adapter and passwordless verification; device access and downloadable private link remain available. Do not claim email was sent if unavailable. External sending and domain setup require the owner's service configuration.

```website-contract
{
  "version": 1,
  "surface": "funnel",
  "request": "Approved checkout audit: build a premium digital studio, $29 introductory offer, relevant keepsake upsell, focused listening/preparing/sharing stages, later feedback, and return access.",
  "hub_revision": "911e97931fb0313bce0dd513afb9ece30f672719",
  "build_revision": "premium-studio-bb25839f9588",
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
      "status": "pass",
      "observation": "Walkthrough verified Listen / Prepare / Share, persisted choice/note, optional note saved before keepsake detour, and feedback hidden until gift given.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-share-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-share-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        }
      ]
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "reduced-motion",
          "revision": "premium-studio-bb25839f9588"
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
      "observation": "Inspected $29 introductory offer, both songs, three revisions and gift-page inclusion. No invented former-price anchor.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-checkout-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-library-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-keepsake-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-lyric-render.png",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
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
    }
  ],
  "prototype": {
    "route": "/song/[id]",
    "sections": [
      "welcome",
      "listening-room",
      "gift-workbench"
    ],
    "revision": "premium-studio-bb25839f9588",
    "status": "pass",
    "observation": "Rendered review passed: focused record/player and contextual workbench across desktop and mobile. Interaction evidence verifies playback and task flow.",
    "evidence": [
      {
        "path": "../../docs/qa/premium-studio-1440.jpg",
        "kind": "screenshot",
        "viewport": "desktop",
        "revision": "premium-studio-bb25839f9588"
      },
      {
        "path": "../../docs/qa/premium-studio-390.jpg",
        "kind": "screenshot",
        "viewport": "mobile",
        "revision": "premium-studio-bb25839f9588"
      },
      {
        "path": "../../docs/qa/premium-browser-evidence.json",
        "kind": "browser-log",
        "viewport": "desktop",
        "revision": "premium-studio-bb25839f9588"
      }
    ]
  },
  "reviews": [
    {
      "route": "/song/[id]",
      "status": "pass",
      "observation": "Premium listening space, single task panel and compact revisions; mobile task navigation moves into view.",
      "evidence": [
        {
          "path": "../../docs/qa/premium-studio-1440.jpg",
          "kind": "screenshot",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-studio-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-library-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
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
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-keepsake-390.jpg",
          "kind": "screenshot",
          "viewport": "mobile",
          "revision": "premium-studio-bb25839f9588"
        },
        {
          "path": "../../docs/qa/premium-browser-evidence.json",
          "kind": "browser-log",
          "viewport": "desktop",
          "revision": "premium-studio-bb25839f9588"
        }
      ]
    }
  ],
  "limitations": []
}
```
