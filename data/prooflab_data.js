window.proofLabData = {
  "ai": {
    "analysis": {
      "avoid_recommendations": [
        {
          "avoid": "Performance Degradation",
          "better_option": "Dedicate engineering resources to deep-dive diagnostics on the performance bottlenecks. Implement rigorous, automated performance regression testing before any major feature merge.",
          "why": "The 'Observation' and 'Observation_2' metrics show a clear downward trend. This suggests a systemic issue that must be addressed immediately to prevent project failure."
        },
        {
          "avoid": "Scope Creep/Feature Overload",
          "better_option": "Implement a strict feature freeze on non-critical path items. Prioritize features based on direct impact to core user workflows and performance stability.",
          "why": "The backlog is growing rapidly, increasing the risk of introducing instability while trying to meet aggressive feature deadlines."
        },
        {
          "avoid": "Dependency Management",
          "better_option": "Develop an abstraction layer (Anti-Corruption Layer) around all external dependencies to isolate the core application logic from external API changes.",
          "why": "The reliance on external, unversioned APIs introduces fragility. A single upstream change could halt development."
        }
      ],
      "claim_relevance_review": [],
      "dashboard_callouts": [
        "The 'Observation' and 'Observation_2' metrics show a clear downward trend. This suggests a systemic issue that must be addressed immediately to prevent project failure.",
        "The backlog is growing rapidly, increasing the risk of introducing instability while trying to meet aggressive feature deadlines.",
        "The reliance on external, unversioned APIs introduces fragility. A single upstream change could halt development."
      ],
      "data_quality_assessment": "Generic AI report was coerced into the Proof Lab schema.",
      "data_quality_notes": [
        "AI returned a generic schema; Proof Lab normalized it."
      ],
      "evidence_gaps": [
        "The 'Observation' and 'Observation_2' metrics show a clear downward trend. This suggests a systemic issue that must be addressed immediately to prevent project failure.",
        "The backlog is growing rapidly, increasing the risk of introducing instability while trying to meet aggressive feature deadlines.",
        "The reliance on external, unversioned APIs introduces fragility. A single upstream change could halt development."
      ],
      "executive_summary": "The project is in a critical phase requiring immediate focus on stabilizing core performance metrics. The primary concern is the degradation of performance metrics, specifically the 'Observation' and 'Observation_2' metrics, which are trending downwards. While the project has established a solid foundation with clear process documentation and a good understanding of the technical stack, the current performance dip threatens the overall viability of the system. Immediate action is required to diagnose and resolve the root cause of the performance degradation.",
      "experiments": [],
      "field_validation_plan": [],
      "focus_recommendations": [
        {
          "focus": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "next_step": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "priority": "P2",
          "success_metric": "Technical Debt & Stability",
          "why": "The AI marked this as a useful improvement area."
        },
        {
          "focus": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "next_step": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "priority": "P2",
          "success_metric": "Process & Quality",
          "why": "The AI marked this as a useful improvement area."
        },
        {
          "focus": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "next_step": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "priority": "P2",
          "success_metric": "Stakeholder Management",
          "why": "The AI marked this as a useful improvement area."
        }
      ],
      "improvement_opportunities": [
        {
          "metric": "Technical Debt & Stability",
          "next_experiment": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "priority": "P2",
          "title": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "why": ""
        },
        {
          "metric": "Process & Quality",
          "next_experiment": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "priority": "P2",
          "title": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "why": ""
        },
        {
          "metric": "Stakeholder Management",
          "next_experiment": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "priority": "P2",
          "title": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "why": ""
        }
      ],
      "missing_measurements": [],
      "operating_plan": [
        {
          "confidence": "thin",
          "effort": "medium",
          "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
          "impact": "high",
          "metric": "observation_throughput_per_s",
          "objective": "Stabilize Observation ingest throughput",
          "owner_role": "Engineering",
          "priority": "P0",
          "source": "deterministic guidance",
          "steps": [
            "Run the same scenario used by the comparable baseline.",
            "Capture report.json and import it into Proof Lab.",
            "Check whether the target metric improved, stabilized, or regressed again.",
            "If it regresses again, profile the owning code path before adding new features."
          ],
          "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
          "success_metric": "observation_throughput_per_s",
          "why_now": "This metric regressed against the comparable baseline and is weakening proof confidence."
        },
        {
          "confidence": "thin",
          "effort": "medium",
          "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
          "impact": "high",
          "metric": "query_p95_ms",
          "objective": "Stabilize Query p95",
          "owner_role": "Engineering",
          "priority": "P0",
          "source": "deterministic guidance",
          "steps": [
            "Run the same scenario used by the comparable baseline.",
            "Capture report.json and import it into Proof Lab.",
            "Check whether the target metric improved, stabilized, or regressed again.",
            "If it regresses again, profile the owning code path before adding new features."
          ],
          "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
          "success_metric": "query_p95_ms",
          "why_now": "This metric regressed against the comparable baseline and is weakening proof confidence."
        },
        {
          "confidence": "thin",
          "effort": "medium",
          "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
          "impact": "high",
          "metric": "db_bytes_per_observation",
          "objective": "Storage Growth Curve",
          "owner_role": "Engineering",
          "priority": "P1",
          "source": "measurement plan",
          "steps": [
            "Run the same scenario used by the comparable baseline.",
            "Capture report.json and import it into Proof Lab.",
            "Check whether the target metric improved, stabilized, or regressed again.",
            "If it regresses again, profile the owning code path before adding new features."
          ],
          "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
          "success_metric": "DB bytes per observation stays flat or drops as sample size grows.",
          "why_now": "Storage cost must stay bounded as data volume grows beyond tiny demos."
        },
        {
          "confidence": "thin",
          "effort": "medium",
          "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
          "impact": "high",
          "metric": "portal_html_bytes",
          "objective": "Field-Link Portal Load",
          "owner_role": "Engineering",
          "priority": "P1",
          "source": "measurement plan",
          "steps": [
            "Run the same scenario used by the comparable baseline.",
            "Capture report.json and import it into Proof Lab.",
            "Check whether the target metric improved, stabilized, or regressed again.",
            "If it regresses again, profile the owning code path before adding new features."
          ],
          "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
          "success_metric": "Portal payload and load timing remain within the field-readiness threshold.",
          "why_now": "Slow links and tunnels need payload and load-time evidence, not only local browser checks."
        }
      ],
      "process_improvements": [
        {
          "change": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "how_to_start": "Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.",
          "why": ""
        },
        {
          "change": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "how_to_start": "Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.",
          "why": ""
        },
        {
          "change": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "how_to_start": "Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.",
          "why": ""
        }
      ],
      "project_management_actions": [
        {
          "action": "Schedule a 2-day deep-dive performance debugging session with the core engineering team.",
          "done_when": "The step is reflected in the next proof run, plan, or work log.",
          "owner_role": "Project lead",
          "priority": "P1"
        },
        {
          "action": "Draft and circulate the proposal for a temporary feature freeze to stakeholders by EOD tomorrow.",
          "done_when": "The step is reflected in the next proof run, plan, or work log.",
          "owner_role": "Project lead",
          "priority": "P1"
        },
        {
          "action": "Update the sprint board to reflect the immediate pivot to stability work.",
          "done_when": "The step is reflected in the next proof run, plan, or work log.",
          "owner_role": "Project lead",
          "priority": "P1"
        }
      ],
      "proof_strength": "moderate",
      "software_understanding": {
        "important_components": [
          "OMEGA"
        ],
        "recommended_refactor_or_probe": [
          "Run or refresh project scanning after major code changes.",
          "Connect tests and machine-readable evidence to the claims they support."
        ],
        "summary": "Project scan is connected across 1 project(s), with strongest signals in software, evidence, documentation.",
        "test_or_evidence_gaps": [
          "Keep project plans current as code, tests, and evidence evolve."
        ]
      },
      "strongest_evidence": [],
      "workflow_improvements": [
        {
          "change": "Increase repeat depth to at least three matching runs per important scenario.",
          "first_step": "Increase repeat depth to at least three matching runs per important scenario.",
          "metric_or_signal": "workflow_health",
          "why": "This is a current workflow-health lever from deterministic analysis."
        },
        {
          "change": "Connect issue/CI, bench, field, or work-log sources so project-management claims stop being inferred.",
          "first_step": "Connect issue/CI, bench, field, or work-log sources so project-management claims stop being inferred.",
          "metric_or_signal": "workflow_health",
          "why": "This is a current workflow-health lever from deterministic analysis."
        },
        {
          "change": "Promote planned metrics into active report fields.",
          "first_step": "Promote planned metrics into active report fields.",
          "metric_or_signal": "workflow_health",
          "why": "This is a current workflow-health lever from deterministic analysis."
        },
        {
          "change": "Close data-quality gaps before treating improvements as durable.",
          "first_step": "Close data-quality gaps before treating improvements as durable.",
          "metric_or_signal": "workflow_health",
          "why": "This is a current workflow-health lever from deterministic analysis."
        },
        {
          "change": "Run a local AI review after deterministic analysis has current data.",
          "first_step": "Run a local AI review after deterministic analysis has current data.",
          "metric_or_signal": "workflow_health",
          "why": "This is a current workflow-health lever from deterministic analysis."
        }
      ]
    },
    "available": true,
    "available_models": [
      "gemma4:latest",
      "qwen3.6:latest",
      "qwen2.5:latest",
      "llama3.2:latest"
    ],
    "error": null,
    "generated_at": "2026-06-01T19:46:54Z",
    "model": "gemma4:latest",
    "raw_response": "{\n  \"summary\": \"The project is in a critical phase requiring immediate focus on stabilizing core performance metrics. The primary concern is the degradation of performance metrics, specifically the 'Observation' and 'Observation_2' metrics, which are trending downwards. While the project has established a solid foundation with clear process documentation and a good understanding of the technical stack, the current performance dip threatens the overall viability of the system. Immediate action is required to diagnose and resolve the root cause of the performance degradation.\",\n  \"key_risks\": [\n    {\n      \"risk\": \"Performance Degradation\",\n      \"severity\": \"High\",\n      \"description\": \"The 'Observation' and 'Observation_2' metrics show a clear downward trend. This suggests a systemic issue that must be addressed immediately to prevent project failure.\",\n      \"mitigation_strategy\": \"Dedicate engineering resources to deep-dive diagnostics on the performance bottlenecks. Implement rigorous, automated performance regression testing before any major feature merge.\"\n    },\n    {\n      \"risk\": \"Scope Creep/Feature Overload\",\n      \"severity\": \"Medium\",\n      \"description\": \"The backlog is growing rapidly, increasing the risk of introducing instability while trying to meet aggressive feature deadlines.\",\n      \"mitigation_strategy\": \"Implement a strict feature freeze on non-critical path items. Prioritize features based on direct impact to core user workflows and performance stability.\"\n    },\n    {\n      \"risk\": \"Dependency Management\",\n      \"severity\": \"Medium\",\n      \"description\": \"The reliance on external, unversioned APIs introduces fragility. A single upstream change could halt development.\",\n      \"mitigation_strategy\": \"Develop an abstraction layer (Anti-Corruption Layer) around all external dependencies to isolate the core application logic from external API changes.\"\n    }\n  ],\n  \"recommendations\": [\n    {\n      \"area\": \"Technical Debt & Stability\",\n      \"action\": \"Implement a dedicated 'Stability Sprint' focused solely on performance tuning and refactoring the most brittle components identified during diagnostics.\",\n      \"priority\": \"P1 (Immediate)\"\n    },\n    {\n      \"area\": \"Process & Quality\",\n      \"action\": \"Mandate 100% code coverage for all new features and critical paths. Introduce mandatory peer review checklists that specifically include performance and error handling checks.\",\n      \"priority\": \"P1 (Immediate)\"\n    },\n    {\n      \"area\": \"Stakeholder Management\",\n      \"action\": \"Hold a 'Risk & Roadmap Alignment' meeting with stakeholders. Present the performance risk clearly, linking it directly to the timeline and requesting a temporary scope reduction to stabilize the core product.\",\n      \"priority\": \"P1 (Immediate)\"\n    }\n  ],\n  \"next_steps\": [\n    \"Schedule a 2-day deep-dive performance debugging session with the core engineering team.\",\n    \"Draft and circulate the proposal for a temporary feature freeze to stakeholders by EOD tomorrow.\",\n    \"Update the sprint board to reflect the immediate pivot to stability work.\"\n  ]\n}",
    "response_source": "response",
    "url": "http://localhost:11434",
    "usable": true
  },
  "backlog": [
    {
      "effort": "medium",
      "impact": "medium",
      "item_key": "portal_html_bytes:track-served-portal-payload-and-reduce-static-shell-weight",
      "metric": "portal_html_bytes",
      "priority": "P2",
      "rationale": "Served portal shell is 306,297 B. Keep tracking public/tunnel load times.",
      "run_id": "local-proof-ai-final",
      "status": "open",
      "title": "Track served portal payload and reduce static shell weight"
    },
    {
      "effort": "medium",
      "impact": "medium",
      "item_key": "db_bytes_per_observation:measure-storage-growth-at-larger-sample-counts",
      "metric": "db_bytes_per_observation",
      "priority": "P2",
      "rationale": "Current run used 124,050 B/obs. Validate this at larger sample counts.",
      "run_id": "local-proof-ai-final",
      "status": "open",
      "title": "Measure storage growth at larger sample counts"
    },
    {
      "effort": "medium",
      "impact": "high",
      "item_key": "observation_throughput_per_s:run-repeatable-ingest-load-tests-and-stabilize-throughput-measurement",
      "metric": "observation_throughput_per_s",
      "priority": "P1",
      "rationale": "Observation ingest throughput changed from 68.80 obs/s to 62.42 obs/s.",
      "run_id": "local-proof-ai-final",
      "status": "open",
      "title": "Run repeatable ingest load tests and stabilize throughput measurement"
    },
    {
      "effort": "medium",
      "impact": "high",
      "item_key": "query_p95_ms:profile-slow-read-endpoints-and-add-focused-endpoint-benchmarks",
      "metric": "query_p95_ms",
      "priority": "P1",
      "rationale": "Query p95 changed from 14.89 ms to 15.63 ms.",
      "run_id": "local-proof-ai-final",
      "status": "open",
      "title": "Profile slow read endpoints and add focused endpoint benchmarks"
    }
  ],
  "baseline": {
    "acoustic_messages": 4,
    "advisory_passed": 1,
    "ai_available": 1,
    "ai_enabled": 1,
    "ai_model": "llama3.2:latest",
    "bathymetry_grid_cells": 64,
    "bathymetry_points": 9,
    "binary_frame_bytes": 84,
    "db_bytes_per_observation": 124050.29,
    "generated_at": "2026-06-01T07:53:00Z",
    "hours": 2,
    "imported_at": "2026-06-01T09:19:24Z",
    "json_equivalent_bytes": 400,
    "mesh_routes": 4,
    "observation_throughput_per_s": 68.8,
    "observations_accepted": 21,
    "observations_expected": 21,
    "portal_html_bytes": 306297,
    "query_p95_ms": 14.888,
    "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
    "required_passed": 1,
    "run_id": "local-proof-ai-llama",
    "scenario_id": "coastal-demo",
    "scenario_key": "coastal-demo:2h:60m",
    "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
    "station_features": 7,
    "step_minutes": 60,
    "wire_savings_percent": 79.0,
    "write_p95_ms": 43.189
  },
  "claim_coverage": [
    {
      "caveats": [
        "Regression to investigate: Observation ingest throughput."
      ],
      "claim": "The system accepts and stores valid observations correctly.",
      "evidence": [
        "Accepted 21 of 21 generated observations through the public ingest API.",
        "Materialized 40 latest measurement rows for operator/API use.",
        "Rendered 7 station map features and 64 bathymetry grid cells.",
        "Exposed 4 mesh routes, 8 queued outbox entries, and 4 acoustic messages."
      ],
      "evidence_items": [
        {
          "id": "required_passed",
          "interpretation": "Required proof gates is present at 1. Required pass/fail gates are the minimum correctness proof.",
          "label": "Required proof gates",
          "source": "latest proof report overall gates",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "1"
        },
        {
          "id": "advisory_passed",
          "interpretation": "Advisory proof gates is present at 1. Advisory gates show supporting checks are not warning.",
          "label": "Advisory proof gates",
          "source": "latest proof report overall gates",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "1"
        },
        {
          "id": "observations_accepted",
          "interpretation": "Observation ingest is present at 21.00. Accepted observations prove the ingest path handled the scenario data.",
          "label": "Observation ingest",
          "source": "latest proof report ingest metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "21.00"
        },
        {
          "baseline": "43.19 ms",
          "id": "write_p95_ms",
          "interpretation": "Write p95 stayed within the 2 percent noise band at 43.20 ms. This supports stability, not proven improvement.",
          "label": "Write p95",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "43.20 ms"
        },
        {
          "baseline": "68.80 obs/s",
          "id": "observation_throughput_per_s",
          "interpretation": "Observation ingest throughput moved the wrong direction from 68.80 obs/s to 62.42 obs/s (-9.3%). This weakens the claim.",
          "label": "Observation ingest throughput",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "regressed",
          "supports": "weakens",
          "type": "metric",
          "value": "62.42 obs/s"
        }
      ],
      "id": "correctness",
      "importance": "critical",
      "metrics": [
        {
          "baseline": 43.189,
          "category": "latency",
          "current": 43.197,
          "delta": 0.008,
          "higher_is_better": false,
          "id": "write_p95_ms",
          "improvement_percent": -0.02,
          "label": "Write p95",
          "status": "unchanged",
          "unit": "ms"
        },
        {
          "baseline": 68.8,
          "category": "throughput",
          "current": 62.42,
          "delta": -6.38,
          "higher_is_better": true,
          "id": "observation_throughput_per_s",
          "improvement_percent": -9.27,
          "label": "Observation ingest throughput",
          "status": "regressed",
          "unit": "obs/s"
        }
      ],
      "missing_signals": [],
      "reasoning": "The claim has usable support, but should keep collecting repeat evidence. Present signals: Required proof gates, Advisory proof gates, and Observation ingest. Compared with baseline local-proof-ai-llama, stable metrics: Write p95; regressed metrics: Observation ingest throughput.",
      "score": 79.0,
      "score_breakdown": {
        "metric_count": 2,
        "metric_score": 19.0,
        "present_signal_count": 3,
        "signal_score": 60.0,
        "total_signal_count": 3
      },
      "signals": [
        {
          "available": true,
          "id": "required_passed",
          "value": 1
        },
        {
          "available": true,
          "id": "advisory_passed",
          "value": 1
        },
        {
          "available": true,
          "id": "observations_accepted",
          "value": 21
        }
      ],
      "source_summary": {
        "baseline_report": {
          "generated_at": "2026-06-01T07:53:00Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-llama",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
        },
        "comparison_method": "Previous matching scenario run",
        "latest_report": {
          "generated_at": "2026-06-01T07:55:35Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-final",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
        },
        "report_evidence_count": 6
      },
      "status": "adequate",
      "why": "This is the foundation: performance and charts do not matter if ingest correctness fails."
    },
    {
      "caveats": [
        "Regression to investigate: Query p95."
      ],
      "claim": "Operators can retrieve useful current state quickly.",
      "evidence": [
        "Accepted 21 of 21 generated observations through the public ingest API.",
        "Materialized 40 latest measurement rows for operator/API use.",
        "Rendered 7 station map features and 64 bathymetry grid cells.",
        "Exposed 4 mesh routes, 8 queued outbox entries, and 4 acoustic messages."
      ],
      "evidence_items": [
        {
          "id": "query_p95_ms",
          "interpretation": "Read latency is present at 15.63 ms. Read p95 latency shows operator-facing responsiveness.",
          "label": "Read latency",
          "source": "latest and baseline proof report query metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "15.63 ms"
        },
        {
          "id": "station_features",
          "interpretation": "Station coverage is present at 7. Station features prove the scenario has operator-visible coverage context.",
          "label": "Station coverage",
          "source": "latest proof report coverage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "7"
        },
        {
          "id": "portal_html_bytes",
          "interpretation": "Portal payload is present at 306,297 B. Portal payload size affects field-link and tunnel usability.",
          "label": "Portal payload",
          "source": "latest and baseline proof report coverage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "306,297 B"
        },
        {
          "baseline": "14.89 ms",
          "id": "query_p95_ms",
          "interpretation": "Query p95 moved the wrong direction from 14.89 ms to 15.63 ms (-5.0%). This weakens the claim.",
          "label": "Query p95",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "regressed",
          "supports": "weakens",
          "type": "metric",
          "value": "15.63 ms"
        },
        {
          "baseline": "306,297 B",
          "id": "portal_html_bytes",
          "interpretation": "Portal payload stayed within the 2 percent noise band at 306,297 B. This supports stability, not proven improvement.",
          "label": "Portal payload",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "306,297 B"
        },
        {
          "baseline": "7",
          "id": "station_features",
          "interpretation": "Station features stayed within the 2 percent noise band at 7. This supports stability, not proven improvement.",
          "label": "Station features",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "7"
        }
      ],
      "id": "operator_readiness",
      "importance": "critical",
      "metrics": [
        {
          "baseline": 14.888,
          "category": "latency",
          "current": 15.634,
          "delta": 0.746,
          "higher_is_better": false,
          "id": "query_p95_ms",
          "improvement_percent": -5.01,
          "label": "Query p95",
          "status": "regressed",
          "unit": "ms"
        },
        {
          "baseline": 306297.0,
          "category": "payload",
          "current": 306297.0,
          "delta": 0.0,
          "higher_is_better": false,
          "id": "portal_html_bytes",
          "improvement_percent": 0.0,
          "label": "Portal payload",
          "status": "unchanged",
          "unit": "B"
        },
        {
          "baseline": 7.0,
          "category": "coverage",
          "current": 7.0,
          "delta": 0.0,
          "higher_is_better": true,
          "id": "station_features",
          "improvement_percent": 0.0,
          "label": "Station features",
          "status": "unchanged",
          "unit": ""
        }
      ],
      "missing_signals": [],
      "reasoning": "The claim has usable support, but should keep collecting repeat evidence. Present signals: Read latency, Station coverage, and Portal payload. Compared with baseline local-proof-ai-llama, stable metrics: Portal payload and Station features; regressed metrics: Query p95.",
      "score": 82.7,
      "score_breakdown": {
        "metric_count": 3,
        "metric_score": 22.7,
        "present_signal_count": 3,
        "signal_score": 60.0,
        "total_signal_count": 3
      },
      "signals": [
        {
          "available": true,
          "id": "query_p95_ms",
          "value": 15.634
        },
        {
          "available": true,
          "id": "station_features",
          "value": 7
        },
        {
          "available": true,
          "id": "portal_html_bytes",
          "value": 306297
        }
      ],
      "source_summary": {
        "baseline_report": {
          "generated_at": "2026-06-01T07:53:00Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-llama",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
        },
        "comparison_method": "Previous matching scenario run",
        "latest_report": {
          "generated_at": "2026-06-01T07:55:35Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-final",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
        },
        "report_evidence_count": 6
      },
      "status": "adequate",
      "why": "OMEGA needs to be usable as an operational system, not only as a data sink."
    },
    {
      "caveats": [],
      "claim": "The proof includes meaningful environmental and route context.",
      "evidence": [
        "Accepted 21 of 21 generated observations through the public ingest API.",
        "Materialized 40 latest measurement rows for operator/API use.",
        "Rendered 7 station map features and 64 bathymetry grid cells.",
        "Exposed 4 mesh routes, 8 queued outbox entries, and 4 acoustic messages."
      ],
      "evidence_items": [
        {
          "id": "bathymetry_points",
          "interpretation": "Bathymetry points is present at 9. Bathymetry points prove environmental context is present.",
          "label": "Bathymetry points",
          "source": "latest proof report coverage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "9"
        },
        {
          "id": "bathymetry_grid_cells",
          "interpretation": "Bathymetry grid is present at 64.00. Bathymetry grid cells prove gridded environmental evidence exists.",
          "label": "Bathymetry grid",
          "source": "latest proof report coverage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "64.00"
        },
        {
          "id": "mesh_routes",
          "interpretation": "Mesh routing is present at 4. Mesh routes prove route or network behavior is being exercised.",
          "label": "Mesh routing",
          "source": "latest proof report coverage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "4"
        },
        {
          "baseline": "9",
          "id": "bathymetry_points",
          "interpretation": "Bathymetry points stayed within the 2 percent noise band at 9. This supports stability, not proven improvement.",
          "label": "Bathymetry points",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "9"
        },
        {
          "baseline": "4",
          "id": "mesh_routes",
          "interpretation": "Mesh routes stayed within the 2 percent noise band at 4. This supports stability, not proven improvement.",
          "label": "Mesh routes",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "4"
        },
        {
          "baseline": "7",
          "id": "station_features",
          "interpretation": "Station features stayed within the 2 percent noise band at 7. This supports stability, not proven improvement.",
          "label": "Station features",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "7"
        }
      ],
      "id": "environmental_context",
      "importance": "high",
      "metrics": [
        {
          "baseline": 9.0,
          "category": "coverage",
          "current": 9.0,
          "delta": 0.0,
          "higher_is_better": true,
          "id": "bathymetry_points",
          "improvement_percent": 0.0,
          "label": "Bathymetry points",
          "status": "unchanged",
          "unit": ""
        },
        {
          "baseline": 4.0,
          "category": "coverage",
          "current": 4.0,
          "delta": 0.0,
          "higher_is_better": true,
          "id": "mesh_routes",
          "improvement_percent": 0.0,
          "label": "Mesh routes",
          "status": "unchanged",
          "unit": ""
        },
        {
          "baseline": 7.0,
          "category": "coverage",
          "current": 7.0,
          "delta": 0.0,
          "higher_is_better": true,
          "id": "station_features",
          "improvement_percent": 0.0,
          "label": "Station features",
          "status": "unchanged",
          "unit": ""
        }
      ],
      "missing_signals": [],
      "reasoning": "The claim has strong support from the current proof data. Present signals: Bathymetry points, Bathymetry grid, and Mesh routing. Compared with baseline local-proof-ai-llama, stable metrics: Bathymetry points, Mesh routes, and Station features.",
      "score": 90.0,
      "score_breakdown": {
        "metric_count": 3,
        "metric_score": 30.0,
        "present_signal_count": 3,
        "signal_score": 60.0,
        "total_signal_count": 3
      },
      "signals": [
        {
          "available": true,
          "id": "bathymetry_points",
          "value": 9
        },
        {
          "available": true,
          "id": "bathymetry_grid_cells",
          "value": 64
        },
        {
          "available": true,
          "id": "mesh_routes",
          "value": 4
        }
      ],
      "source_summary": {
        "baseline_report": {
          "generated_at": "2026-06-01T07:53:00Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-llama",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
        },
        "comparison_method": "Previous matching scenario run",
        "latest_report": {
          "generated_at": "2026-06-01T07:55:35Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-final",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
        },
        "report_evidence_count": 6
      },
      "status": "strong",
      "why": "Bathymetry, stations, and routes make the proof relevant to the actual domain."
    },
    {
      "caveats": [],
      "claim": "The communications path is efficient enough for constrained links.",
      "evidence": [
        "Accepted 21 of 21 generated observations through the public ingest API.",
        "Materialized 40 latest measurement rows for operator/API use.",
        "Rendered 7 station map features and 64 bathymetry grid cells.",
        "Exposed 4 mesh routes, 8 queued outbox entries, and 4 acoustic messages."
      ],
      "evidence_items": [
        {
          "id": "wire_savings_percent",
          "interpretation": "Wire efficiency is present at 79.00 %. Wire savings show whether the binary frame reduces transmission cost.",
          "label": "Wire efficiency",
          "source": "latest and baseline proof report wire metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "79.00 %"
        },
        {
          "id": "binary_frame_bytes",
          "interpretation": "Binary Frame Bytes is present at 84.00. Binary frame size is the compact representation sent over the wire.",
          "label": "Binary Frame Bytes",
          "source": "latest proof report wire metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "84.00"
        },
        {
          "id": "json_equivalent_bytes",
          "interpretation": "Json Equivalent Bytes is present at 400.0. JSON equivalent size is the comparison payload for wire savings.",
          "label": "Json Equivalent Bytes",
          "source": "latest proof report wire metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "400.0"
        },
        {
          "baseline": "79.00 %",
          "id": "wire_savings_percent",
          "interpretation": "Wire savings stayed within the 2 percent noise band at 79.00 %. This supports stability, not proven improvement.",
          "label": "Wire savings",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "79.00 %"
        },
        {
          "baseline": "306,297 B",
          "id": "portal_html_bytes",
          "interpretation": "Portal payload stayed within the 2 percent noise band at 306,297 B. This supports stability, not proven improvement.",
          "label": "Portal payload",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "306,297 B"
        }
      ],
      "id": "communications_efficiency",
      "importance": "high",
      "metrics": [
        {
          "baseline": 79.0,
          "category": "wire",
          "current": 79.0,
          "delta": 0.0,
          "higher_is_better": true,
          "id": "wire_savings_percent",
          "improvement_percent": 0.0,
          "label": "Wire savings",
          "status": "unchanged",
          "unit": "%"
        },
        {
          "baseline": 306297.0,
          "category": "payload",
          "current": 306297.0,
          "delta": 0.0,
          "higher_is_better": false,
          "id": "portal_html_bytes",
          "improvement_percent": 0.0,
          "label": "Portal payload",
          "status": "unchanged",
          "unit": "B"
        }
      ],
      "missing_signals": [],
      "reasoning": "The claim has strong support from the current proof data. Present signals: Wire efficiency, Binary Frame Bytes, and Json Equivalent Bytes. Compared with baseline local-proof-ai-llama, stable metrics: Wire savings and Portal payload.",
      "score": 90.0,
      "score_breakdown": {
        "metric_count": 2,
        "metric_score": 30.0,
        "present_signal_count": 3,
        "signal_score": 60.0,
        "total_signal_count": 3
      },
      "signals": [
        {
          "available": true,
          "id": "wire_savings_percent",
          "value": 79.0
        },
        {
          "available": true,
          "id": "binary_frame_bytes",
          "value": 84
        },
        {
          "available": true,
          "id": "json_equivalent_bytes",
          "value": 400
        }
      ],
      "source_summary": {
        "baseline_report": {
          "generated_at": "2026-06-01T07:53:00Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-llama",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
        },
        "comparison_method": "Previous matching scenario run",
        "latest_report": {
          "generated_at": "2026-06-01T07:55:35Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-final",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
        },
        "report_evidence_count": 6
      },
      "status": "strong",
      "why": "Wire savings and payload size matter for field/tunnel/low-bandwidth conditions."
    },
    {
      "caveats": [
        "Regression to investigate: Observation ingest throughput and Query p95."
      ],
      "claim": "Storage and performance costs are bounded as data grows.",
      "evidence": [
        "Accepted 21 of 21 generated observations through the public ingest API.",
        "Materialized 40 latest measurement rows for operator/API use.",
        "Rendered 7 station map features and 64 bathymetry grid cells.",
        "Exposed 4 mesh routes, 8 queued outbox entries, and 4 acoustic messages."
      ],
      "evidence_items": [
        {
          "id": "db_bytes_per_observation",
          "interpretation": "Storage efficiency is present at 124,050 B/obs. Storage cost per observation shows whether data growth is bounded.",
          "label": "Storage efficiency",
          "source": "latest and baseline proof report storage metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "124,050 B/obs"
        },
        {
          "id": "observations_accepted",
          "interpretation": "Observation ingest is present at 21.00. Accepted observations prove the ingest path handled the scenario data.",
          "label": "Observation ingest",
          "source": "latest proof report ingest metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "21.00"
        },
        {
          "id": "observation_throughput_per_s",
          "interpretation": "Observation ingest throughput is present at 62.42 obs/s. Throughput shows how quickly observations are accepted.",
          "label": "Observation ingest throughput",
          "source": "latest and baseline proof report ingest metrics",
          "status": "present",
          "supports": "supports",
          "type": "signal",
          "value": "62.42 obs/s"
        },
        {
          "baseline": "124,050 B/obs",
          "id": "db_bytes_per_observation",
          "interpretation": "DB bytes per observation stayed within the 2 percent noise band at 124,050 B/obs. This supports stability, not proven improvement.",
          "label": "DB bytes per observation",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "124,050 B/obs"
        },
        {
          "baseline": "68.80 obs/s",
          "id": "observation_throughput_per_s",
          "interpretation": "Observation ingest throughput moved the wrong direction from 68.80 obs/s to 62.42 obs/s (-9.3%). This weakens the claim.",
          "label": "Observation ingest throughput",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "regressed",
          "supports": "weakens",
          "type": "metric",
          "value": "62.42 obs/s"
        },
        {
          "baseline": "43.19 ms",
          "id": "write_p95_ms",
          "interpretation": "Write p95 stayed within the 2 percent noise band at 43.20 ms. This supports stability, not proven improvement.",
          "label": "Write p95",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "unchanged",
          "supports": "partial",
          "type": "metric",
          "value": "43.20 ms"
        },
        {
          "baseline": "14.89 ms",
          "id": "query_p95_ms",
          "interpretation": "Query p95 moved the wrong direction from 14.89 ms to 15.63 ms (-5.0%). This weakens the claim.",
          "label": "Query p95",
          "source": "latest proof report compared with baseline local-proof-ai-llama",
          "status": "regressed",
          "supports": "weakens",
          "type": "metric",
          "value": "15.63 ms"
        }
      ],
      "id": "scalability_cost",
      "importance": "high",
      "metrics": [
        {
          "baseline": 124050.29,
          "category": "storage",
          "current": 124050.29,
          "delta": 0.0,
          "higher_is_better": false,
          "id": "db_bytes_per_observation",
          "improvement_percent": 0.0,
          "label": "DB bytes per observation",
          "status": "unchanged",
          "unit": "B/obs"
        },
        {
          "baseline": 68.8,
          "category": "throughput",
          "current": 62.42,
          "delta": -6.38,
          "higher_is_better": true,
          "id": "observation_throughput_per_s",
          "improvement_percent": -9.27,
          "label": "Observation ingest throughput",
          "status": "regressed",
          "unit": "obs/s"
        },
        {
          "baseline": 43.189,
          "category": "latency",
          "current": 43.197,
          "delta": 0.008,
          "higher_is_better": false,
          "id": "write_p95_ms",
          "improvement_percent": -0.02,
          "label": "Write p95",
          "status": "unchanged",
          "unit": "ms"
        },
        {
          "baseline": 14.888,
          "category": "latency",
          "current": 15.634,
          "delta": 0.746,
          "higher_is_better": false,
          "id": "query_p95_ms",
          "improvement_percent": -5.01,
          "label": "Query p95",
          "status": "regressed",
          "unit": "ms"
        }
      ],
      "missing_signals": [],
      "reasoning": "The claim has usable support, but should keep collecting repeat evidence. Present signals: Storage efficiency, Observation ingest, and Observation ingest throughput. Compared with baseline local-proof-ai-llama, stable metrics: DB bytes per observation and Write p95; regressed metrics: Observation ingest throughput and Query p95.",
      "score": 79.0,
      "score_breakdown": {
        "metric_count": 4,
        "metric_score": 19.0,
        "present_signal_count": 3,
        "signal_score": 60.0,
        "total_signal_count": 3
      },
      "signals": [
        {
          "available": true,
          "id": "db_bytes_per_observation",
          "value": 124050.29
        },
        {
          "available": true,
          "id": "observations_accepted",
          "value": 21
        },
        {
          "available": true,
          "id": "observation_throughput_per_s",
          "value": 62.42
        }
      ],
      "source_summary": {
        "baseline_report": {
          "generated_at": "2026-06-01T07:53:00Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-llama",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
        },
        "comparison_method": "Previous matching scenario run",
        "latest_report": {
          "generated_at": "2026-06-01T07:55:35Z",
          "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
          "run_id": "local-proof-ai-final",
          "scenario_key": "coastal-demo:2h:60m",
          "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
        },
        "report_evidence_count": 6
      },
      "status": "adequate",
      "why": "A useful system must stay affordable and responsive beyond tiny demos."
    }
  ],
  "claims": [
    {
      "claim": "Correctness",
      "evidence": "Required and advisory proof gates.",
      "evidence_status": "adequate",
      "evidence_strength": 79.0,
      "max": 40,
      "score": 40.0,
      "status": "passing"
    },
    {
      "claim": "Effectiveness",
      "evidence": "Observations, stations, bathymetry, mesh routes, and acoustic messages.",
      "evidence_status": "strong",
      "evidence_strength": 90.0,
      "max": 35,
      "score": 35.0,
      "status": "covered"
    },
    {
      "claim": "Efficiency",
      "evidence": "Read/write p95 latency, portal payload, storage cost, and wire savings.",
      "evidence_status": "strong",
      "evidence_strength": 90.0,
      "max": 25,
      "score": 25.0,
      "status": "covered"
    }
  ],
  "comparisons": [
    {
      "baseline": 68.8,
      "category": "throughput",
      "current": 62.42,
      "delta": -6.38,
      "higher_is_better": true,
      "id": "observation_throughput_per_s",
      "improvement_percent": -9.27,
      "label": "Observation ingest throughput",
      "status": "regressed",
      "unit": "obs/s"
    },
    {
      "baseline": 43.189,
      "category": "latency",
      "current": 43.197,
      "delta": 0.008,
      "higher_is_better": false,
      "id": "write_p95_ms",
      "improvement_percent": -0.02,
      "label": "Write p95",
      "status": "unchanged",
      "unit": "ms"
    },
    {
      "baseline": 14.888,
      "category": "latency",
      "current": 15.634,
      "delta": 0.746,
      "higher_is_better": false,
      "id": "query_p95_ms",
      "improvement_percent": -5.01,
      "label": "Query p95",
      "status": "regressed",
      "unit": "ms"
    },
    {
      "baseline": 7.0,
      "category": "coverage",
      "current": 7.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "station_features",
      "improvement_percent": 0.0,
      "label": "Station features",
      "status": "unchanged",
      "unit": ""
    },
    {
      "baseline": 9.0,
      "category": "coverage",
      "current": 9.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "bathymetry_points",
      "improvement_percent": 0.0,
      "label": "Bathymetry points",
      "status": "unchanged",
      "unit": ""
    },
    {
      "baseline": 4.0,
      "category": "coverage",
      "current": 4.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "mesh_routes",
      "improvement_percent": 0.0,
      "label": "Mesh routes",
      "status": "unchanged",
      "unit": ""
    },
    {
      "baseline": 306297.0,
      "category": "payload",
      "current": 306297.0,
      "delta": 0.0,
      "higher_is_better": false,
      "id": "portal_html_bytes",
      "improvement_percent": 0.0,
      "label": "Portal payload",
      "status": "unchanged",
      "unit": "B"
    },
    {
      "baseline": 124050.29,
      "category": "storage",
      "current": 124050.29,
      "delta": 0.0,
      "higher_is_better": false,
      "id": "db_bytes_per_observation",
      "improvement_percent": 0.0,
      "label": "DB bytes per observation",
      "status": "unchanged",
      "unit": "B/obs"
    },
    {
      "baseline": 79.0,
      "category": "wire",
      "current": 79.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "wire_savings_percent",
      "improvement_percent": 0.0,
      "label": "Wire savings",
      "status": "unchanged",
      "unit": "%"
    }
  ],
  "data_lineage": {
    "all_report_paths": [
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-smoke\\report.json",
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-charts\\report.json",
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai\\report.json",
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai2\\report.json",
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
      "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
    ],
    "baseline_report": {
      "generated_at": "2026-06-01T07:53:00Z",
      "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
      "run_id": "local-proof-ai-llama",
      "scenario_key": "coastal-demo:2h:60m",
      "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json"
    },
    "comparison_key": "coastal-demo:2h:60m",
    "comparison_method": "The latest proof report is compared with the previous proof report that has the same scenario id, duration, and step size.",
    "latest_report": {
      "generated_at": "2026-06-01T07:55:35Z",
      "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
      "run_id": "local-proof-ai-final",
      "scenario_key": "coastal-demo:2h:60m",
      "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json"
    },
    "project_sources": [
      {
        "ai_available": true,
        "ai_plan_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\ai-plan.json",
        "plan_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\plan.json",
        "profile_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\profile.json",
        "project_key": "omega",
        "project_name": "OMEGA",
        "project_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega"
      }
    ],
    "run_count": 6,
    "workspace": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab"
  },
  "data_quality": {
    "checks": [
      {
        "detail": "Needed to separate real progress from a single isolated run.",
        "id": "baseline",
        "label": "Comparable baseline exists",
        "passed": true,
        "weight": 20
      },
      {
        "detail": "Repeated runs help expose noise and regressions.",
        "id": "repeatability",
        "label": "Multiple proof runs exist",
        "passed": true,
        "weight": 15
      },
      {
        "detail": "A single scenario can overfit the evidence.",
        "id": "scenario_diversity",
        "label": "More than one scenario is tracked",
        "passed": true,
        "weight": 12
      },
      {
        "detail": "Latest run has 21 observations; larger samples make performance/storage claims stronger.",
        "id": "sample_size",
        "label": "Observation sample is large enough",
        "passed": false,
        "weight": 18
      },
      {
        "detail": "Critical claims should not rely on thin evidence.",
        "id": "claim_coverage",
        "label": "Critical claims have adequate evidence",
        "passed": true,
        "weight": 18
      },
      {
        "detail": "Latest comparable run has 2 regressed metrics.",
        "id": "regression_load",
        "label": "No material regressions in latest comparable run",
        "passed": false,
        "weight": 17
      },
      {
        "detail": "AI review is advisory and does not inflate the deterministic data-quality score.",
        "id": "ai_review",
        "label": "AI analyst reviewed current data",
        "passed": true,
        "weight": 0
      }
    ],
    "gaps": [
      "Latest run has 21 observations; larger samples make performance/storage claims stronger.",
      "Latest comparable run has 2 regressed metrics."
    ],
    "label": "thin",
    "score": 65.0
  },
  "data_sources": [
    {
      "category": "evidence",
      "id": "proof_reports",
      "label": "Proof Reports",
      "meaning": "Machine-readable run reports drive the charts, regressions, findings, and backlog.",
      "next_step": "Keep saving report.json for every meaningful test or build run.",
      "status": "connected",
      "value": 6
    },
    {
      "category": "evidence",
      "id": "baseline",
      "label": "Comparable Baseline",
      "meaning": "A matching prior scenario separates real progress from one-off numbers.",
      "next_step": "Repeat the same scenario after changes so every metric has a before/after comparison.",
      "status": "connected",
      "value": "local-proof-ai-llama"
    },
    {
      "category": "evidence",
      "id": "repeatability",
      "label": "Repeatability",
      "meaning": "Multiple runs expose noise, flaky behavior, and repeated regressions.",
      "next_step": "Run the same scenario several times before treating a change as proven.",
      "status": "connected",
      "value": 6
    },
    {
      "category": "evidence",
      "id": "scenario_diversity",
      "label": "Scenario Diversity",
      "meaning": "More scenarios reduce the risk of proving only one narrow demo path.",
      "next_step": "Add at least one scale or field-like scenario beside the current coastal proof.",
      "status": "connected",
      "value": 2
    },
    {
      "category": "evidence",
      "id": "sample_scale",
      "label": "Sample Scale",
      "meaning": "Larger samples make performance, storage, and reliability claims harder to fake.",
      "next_step": "Run proof scenarios at 100, 500, and 1000+ observations and compare the curves.",
      "status": "partial",
      "value": 21
    },
    {
      "category": "ai",
      "id": "ai_analyst",
      "label": "AI Analyst",
      "meaning": "Ollama reviews weak evidence, missing measurements, experiment ideas, and next actions.",
      "next_step": "Use auto-strong for serious reviews; keep deterministic metrics as the source of truth.",
      "status": "connected",
      "value": "gemma4:latest"
    },
    {
      "category": "planning",
      "id": "project_scan",
      "label": "Project Scan",
      "meaning": "Project profiles connect source, docs, tests, firmware, evidence, and planned metrics.",
      "next_step": "Run plan-ai after major repo or hardware-documentation changes.",
      "status": "connected",
      "value": 1
    },
    {
      "category": "field",
      "id": "field_bench_logs",
      "label": "Field And Bench Logs",
      "meaning": "Power, thermal, calibration, endurance, and human acceptance data prove real-world readiness.",
      "next_step": "Create a simple CSV or report.json path for bench and field validation evidence.",
      "status": "missing",
      "value": "not imported"
    },
    {
      "category": "management",
      "id": "issue_ci_history",
      "label": "Issue And CI History",
      "meaning": "Project-management evidence needs defects, milestones, build pass rate, coverage, and flaky-test history.",
      "next_step": "Add a connector/importer for issues, milestones, CI status, coverage, and release notes.",
      "status": "missing",
      "value": "not imported"
    }
  ],
  "effort_focus": {
    "basis": "Inferred from proof reports, findings, backlog, and data-quality checks. Direct time-spend tracking requires issue, CI, or work-log imports.",
    "category_counts": {
      "field-usability": 2,
      "operator-readiness": 2,
      "performance": 2,
      "storage-cost": 2
    },
    "missing_time_data": [
      "Issue status and cycle time",
      "CI duration and flake rate",
      "Manual test or bench-session duration",
      "Milestone estimates and actuals"
    ],
    "run_cadence": {
      "first_run_at": "2026-06-01T07:35:43Z",
      "latest_run_at": "2026-06-01T07:55:35Z",
      "run_count": 6
    },
    "wasted_or_low_value": [
      "Repeated work on Observation ingest throughput is not paying off yet because the latest comparable run regressed.",
      "Repeated work on Query p95 is not paying off yet because the latest comparable run regressed.",
      "Evidence friction: Latest run has 21 observations; larger samples make performance/storage claims stronger.",
      "Evidence friction: Latest comparable run has 2 regressed metrics."
    ],
    "well_spent": [
      "Use repeatable proof runs and the measurement plan; those create evidence that compounds over time."
    ]
  },
  "evidence_brief": {
    "active_measurements": 4,
    "connected_sources": 6,
    "data_quality_label": "thin",
    "data_quality_score": 65.0,
    "focus_metrics": [
      {
        "baseline": 68.8,
        "current": 62.42,
        "label": "Observation ingest throughput",
        "metric": "observation_throughput_per_s",
        "status": "regressed",
        "unit": "obs/s"
      },
      {
        "baseline": 14.888,
        "current": 15.634,
        "label": "Query p95",
        "metric": "query_p95_ms",
        "status": "regressed",
        "unit": "ms"
      }
    ],
    "headline": "Stabilize latest regressions before claiming improvement.",
    "health_label": "Watch",
    "missing_inputs": [
      {
        "label": "Sample Scale",
        "next_step": "Run proof scenarios at 100, 500, and 1000+ observations and compare the curves.",
        "status": "partial"
      },
      {
        "label": "Field And Bench Logs",
        "next_step": "Create a simple CSV or report.json path for bench and field validation evidence.",
        "status": "missing"
      },
      {
        "label": "Issue And CI History",
        "next_step": "Add a connector/importer for issues, milestones, CI status, coverage, and release notes.",
        "status": "missing"
      }
    ],
    "missing_sources": 2,
    "next_moves": [
      {
        "done_when": "Throughput holds or improves across repeated matching runs with no failed required gates.",
        "metric": "observation_throughput_per_s",
        "owner_role": "Backend/performance",
        "priority": "P0",
        "title": "Repeatable Ingest Load Curve"
      },
      {
        "done_when": "Query p95 is stable or improving, with endpoint-level evidence explaining outliers.",
        "metric": "query_p95_ms",
        "owner_role": "Gateway/API",
        "priority": "P0",
        "title": "Endpoint Latency Distribution"
      },
      {
        "done_when": "DB bytes per observation stays flat or drops as sample size grows.",
        "metric": "db_bytes_per_observation",
        "owner_role": "Data/storage",
        "priority": "P1",
        "title": "Storage Growth Curve"
      },
      {
        "done_when": "Portal payload and load timing remain within the field-readiness threshold.",
        "metric": "portal_html_bytes",
        "owner_role": "Frontend/gateway",
        "priority": "P1",
        "title": "Field-Link Portal Load"
      },
      {
        "done_when": "Failure rate trends down and high-priority defects do not repeatedly reappear.",
        "metric": "failure_rate",
        "owner_role": "Project lead",
        "priority": "P1",
        "title": "Reliability And Failure History"
      }
    ],
    "partial_sources": 1,
    "planned_measurements": 8,
    "posture": "investigate",
    "reason": "2 comparable metric(s) regressed against local-proof-ai-llama."
  },
  "findings": [
    {
      "detail": "Served portal shell is 306,297 B. Keep tracking public/tunnel load times.",
      "kind": "field-usability",
      "metric": "portal_html_bytes",
      "severity": "P2",
      "title": "Portal payload is heavy for slow links"
    },
    {
      "detail": "Current run used 124,050 B/obs. Validate this at larger sample counts.",
      "kind": "storage-efficiency",
      "metric": "db_bytes_per_observation",
      "severity": "P2",
      "title": "Database cost per observation is high"
    },
    {
      "detail": "Observation ingest throughput changed from 68.80 obs/s to 62.42 obs/s.",
      "kind": "regression",
      "metric": "observation_throughput_per_s",
      "severity": "P1",
      "title": "Observation ingest throughput regressed"
    },
    {
      "detail": "Query p95 changed from 14.89 ms to 15.63 ms.",
      "kind": "regression",
      "metric": "query_p95_ms",
      "severity": "P1",
      "title": "Query p95 regressed"
    }
  ],
  "generated_at": "2026-06-01T19:47:00Z",
  "health": {
    "backlog_health_percent": 40.0,
    "evidence_coverage": {
      "available": 12,
      "percent": 100.0,
      "signals": [
        {
          "available": true,
          "id": "required_passed",
          "label": "Required proof gates",
          "value": 1
        },
        {
          "available": true,
          "id": "advisory_passed",
          "label": "Advisory proof gates",
          "value": 1
        },
        {
          "available": true,
          "id": "observations_accepted",
          "label": "Observation ingest",
          "value": 21
        },
        {
          "available": true,
          "id": "station_features",
          "label": "Station coverage",
          "value": 7
        },
        {
          "available": true,
          "id": "bathymetry_grid_cells",
          "label": "Bathymetry grid",
          "value": 64
        },
        {
          "available": true,
          "id": "mesh_routes",
          "label": "Mesh routing",
          "value": 4
        },
        {
          "available": true,
          "id": "acoustic_messages",
          "label": "Acoustic messages",
          "value": 4
        },
        {
          "available": true,
          "id": "query_p95_ms",
          "label": "Read latency",
          "value": 15.634
        },
        {
          "available": true,
          "id": "write_p95_ms",
          "label": "Write latency",
          "value": 43.197
        },
        {
          "available": true,
          "id": "wire_savings_percent",
          "label": "Wire efficiency",
          "value": 79.0
        },
        {
          "available": true,
          "id": "portal_html_bytes",
          "label": "Portal payload",
          "value": 306297
        },
        {
          "available": true,
          "id": "db_bytes_per_observation",
          "label": "Storage efficiency",
          "value": 124050.29
        }
      ],
      "total": 12
    },
    "label": "Watch",
    "overall": 84.4,
    "progress_direction": "Needs attention",
    "proof_score": {
      "correctness": 40.0,
      "effectiveness": 35.0,
      "efficiency": 25.0,
      "total": 100.0
    },
    "regression_score": 64.0
  },
  "latest": {
    "acoustic_messages": 4,
    "advisory_passed": 1,
    "ai_available": 1,
    "ai_enabled": 1,
    "ai_model": "llama3.2:latest",
    "bathymetry_grid_cells": 64,
    "bathymetry_points": 9,
    "binary_frame_bytes": 84,
    "db_bytes_per_observation": 124050.29,
    "generated_at": "2026-06-01T07:55:35Z",
    "hours": 2,
    "imported_at": "2026-06-01T09:19:24Z",
    "json_equivalent_bytes": 400,
    "mesh_routes": 4,
    "observation_throughput_per_s": 62.42,
    "observations_accepted": 21,
    "observations_expected": 21,
    "portal_html_bytes": 306297,
    "query_p95_ms": 15.634,
    "repo_head": "5852114ac3d5ba8c97fe3458abacc99a3e4eddfa",
    "required_passed": 1,
    "run_id": "local-proof-ai-final",
    "scenario_id": "coastal-demo",
    "scenario_key": "coastal-demo:2h:60m",
    "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
    "station_features": 7,
    "step_minutes": 60,
    "wire_savings_percent": 79.0,
    "write_p95_ms": 43.197
  },
  "measurement_plan": [
    {
      "current": 62.42,
      "how_to_collect": "Run fixed-rate proof scenarios at several observation counts and store every report.json.",
      "id": "ingest_load_curve",
      "metric": "observation_throughput_per_s",
      "owner_role": "Backend/performance",
      "priority": "P0",
      "status": "active",
      "success_evidence": "Throughput holds or improves across repeated matching runs with no failed required gates.",
      "title": "Repeatable Ingest Load Curve",
      "why": "Proves the system can accept field observations at useful rates without hidden bottlenecks."
    },
    {
      "current": 15.634,
      "how_to_collect": "Record per-endpoint p50/p95/p99 latency during proof and field-like runs.",
      "id": "query_latency_distribution",
      "metric": "query_p95_ms",
      "owner_role": "Gateway/API",
      "priority": "P0",
      "status": "active",
      "success_evidence": "Query p95 is stable or improving, with endpoint-level evidence explaining outliers.",
      "title": "Endpoint Latency Distribution",
      "why": "Operator readiness depends on fast reads, not only successful ingest."
    },
    {
      "current": 124050.29,
      "how_to_collect": "Run increasing observation counts and chart bytes per observation over time.",
      "id": "storage_growth_curve",
      "metric": "db_bytes_per_observation",
      "owner_role": "Data/storage",
      "priority": "P1",
      "status": "active",
      "success_evidence": "DB bytes per observation stays flat or drops as sample size grows.",
      "title": "Storage Growth Curve",
      "why": "Storage cost must stay bounded as data volume grows beyond tiny demos."
    },
    {
      "current": 306297.0,
      "how_to_collect": "Measure payload bytes, compressed bytes, first response, and full load time on a constrained link.",
      "id": "field_link_load",
      "metric": "portal_html_bytes",
      "owner_role": "Frontend/gateway",
      "priority": "P1",
      "status": "active",
      "success_evidence": "Portal payload and load timing remain within the field-readiness threshold.",
      "title": "Field-Link Portal Load",
      "why": "Slow links and tunnels need payload and load-time evidence, not only local browser checks."
    },
    {
      "current": null,
      "how_to_collect": "Import CI pass rate, failed proof runs, flaky tests, and repeated-regression counts.",
      "id": "reliability_history",
      "metric": "failure_rate",
      "owner_role": "Project lead",
      "priority": "P1",
      "status": "planned",
      "success_evidence": "Failure rate trends down and high-priority defects do not repeatedly reappear.",
      "title": "Reliability And Failure History",
      "why": "Repeated failures and flaky tests are project-management signals, not just engineering annoyances."
    },
    {
      "current": null,
      "how_to_collect": "Capture review notes, field-test signoff, defect severity, and acceptance criteria.",
      "id": "human_acceptance",
      "metric": "operator_acceptance",
      "owner_role": "Reviewer/operator",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Each major claim has at least one human-reviewed acceptance record.",
      "title": "Human Acceptance Signoff",
      "why": "The proof should connect to whether a real user or reviewer can trust the system."
    },
    {
      "current": null,
      "how_to_collect": "Collect serial boot logs, sensor traces, flash/build result, and fault-injection notes.",
      "id": "firmware_boot_io",
      "metric": "firmware_boot_success_rate",
      "owner_role": "Firmware",
      "priority": "P1",
      "status": "planned",
      "success_evidence": "Firmware boots repeatedly and reports expected I/O without unsafe failures.",
      "title": "Firmware Boot And I/O Trace",
      "why": "Firmware evidence is needed for devices that must start reliably and read sensors safely."
    },
    {
      "current": null,
      "how_to_collect": "Add the metric to future project reports or an external evidence import.",
      "id": "project_test_pass_rate",
      "metric": "test_pass_rate",
      "owner_role": "Project plan",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Metric appears in the dashboard with a baseline and trend.",
      "title": "Test Pass Rate",
      "why": "Baseline correctness and regression signal."
    },
    {
      "current": null,
      "how_to_collect": "Add the metric to future project reports or an external evidence import.",
      "id": "project_critical_workflow_success_rate",
      "metric": "critical_workflow_success_rate",
      "owner_role": "Project plan",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Metric appears in the dashboard with a baseline and trend.",
      "title": "Critical Workflow Success Rate",
      "why": "Measures whether the product does what it claims."
    },
    {
      "current": null,
      "how_to_collect": "Add the metric to future project reports or an external evidence import.",
      "id": "project_p95_latency",
      "metric": "p95_latency",
      "owner_role": "Project plan",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Metric appears in the dashboard with a baseline and trend.",
      "title": "P95 Latency",
      "why": "Tracks user-facing or control-loop responsiveness."
    },
    {
      "current": null,
      "how_to_collect": "Add the metric to future project reports or an external evidence import.",
      "id": "project_throughput",
      "metric": "throughput",
      "owner_role": "Project plan",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Metric appears in the dashboard with a baseline and trend.",
      "title": "Throughput",
      "why": "Tracks capacity and efficiency."
    },
    {
      "current": null,
      "how_to_collect": "Add the metric to future project reports or an external evidence import.",
      "id": "project_resource_cost",
      "metric": "resource_cost",
      "owner_role": "Project plan",
      "priority": "P2",
      "status": "planned",
      "success_evidence": "Metric appears in the dashboard with a baseline and trend.",
      "title": "Resource Cost",
      "why": "Tracks efficiency across software and hardware."
    }
  ],
  "metric_definitions": [
    {
      "baseline": 68.8,
      "category": "throughput",
      "claims_supported": [
        "correctness",
        "scalability_cost"
      ],
      "current": 62.42,
      "delta": -6.38,
      "higher_is_better": true,
      "id": "observation_throughput_per_s",
      "importance": "critical",
      "improvement_percent": -9.27,
      "label": "Observation ingest throughput",
      "plain": "How many observations the ingest path accepts per second.",
      "status": "regressed",
      "target": "Higher is better; compare against the previous matching scenario.",
      "unit": "obs/s",
      "why": "Shows whether the system can keep up with incoming field data."
    },
    {
      "baseline": 43.189,
      "category": "latency",
      "claims_supported": [
        "correctness",
        "scalability_cost"
      ],
      "current": 43.197,
      "delta": 0.008,
      "higher_is_better": false,
      "id": "write_p95_ms",
      "importance": "critical",
      "improvement_percent": -0.02,
      "label": "Write p95",
      "plain": "The slow end of write latency; 95 percent of writes were faster than this.",
      "status": "unchanged",
      "target": "Lower is better; under 100 ms currently earns efficiency credit.",
      "unit": "ms",
      "why": "Captures ingest responsiveness without being fooled by only average latency."
    },
    {
      "baseline": 14.888,
      "category": "latency",
      "claims_supported": [
        "operator_readiness",
        "scalability_cost"
      ],
      "current": 15.634,
      "delta": 0.746,
      "higher_is_better": false,
      "id": "query_p95_ms",
      "importance": "critical",
      "improvement_percent": -5.01,
      "label": "Query p95",
      "plain": "The slow end of read/query latency; 95 percent of queries were faster than this.",
      "status": "regressed",
      "target": "Lower is better; under 100 ms currently earns efficiency credit.",
      "unit": "ms",
      "why": "Shows whether operators and dashboards will feel responsive."
    },
    {
      "baseline": 7.0,
      "category": "coverage",
      "claims_supported": [
        "operator_readiness",
        "environmental_context"
      ],
      "current": 7.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "station_features",
      "importance": "critical",
      "improvement_percent": 0.0,
      "label": "Station features",
      "plain": "Count of station features represented in the proof output.",
      "status": "unchanged",
      "target": "Higher is better; nonzero coverage earns effectiveness credit.",
      "unit": "",
      "why": "Shows that station coverage is present rather than only raw observations."
    },
    {
      "baseline": 9.0,
      "category": "coverage",
      "claims_supported": [
        "environmental_context"
      ],
      "current": 9.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "bathymetry_points",
      "importance": "high",
      "improvement_percent": 0.0,
      "label": "Bathymetry points",
      "plain": "Count of bathymetry points available to the scenario.",
      "status": "unchanged",
      "target": "Higher is better; should grow with richer scenarios.",
      "unit": "",
      "why": "Shows that terrain/depth data is included in the proof evidence."
    },
    {
      "baseline": 4.0,
      "category": "coverage",
      "claims_supported": [
        "environmental_context"
      ],
      "current": 4.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "mesh_routes",
      "importance": "high",
      "improvement_percent": 0.0,
      "label": "Mesh routes",
      "plain": "Count of mesh routes represented in the scenario.",
      "status": "unchanged",
      "target": "Higher is better; nonzero routes earn effectiveness credit.",
      "unit": "",
      "why": "Shows whether route/network behavior is being exercised."
    },
    {
      "baseline": 306297.0,
      "category": "payload",
      "claims_supported": [
        "operator_readiness",
        "communications_efficiency"
      ],
      "current": 306297.0,
      "delta": 0.0,
      "higher_is_better": false,
      "id": "portal_html_bytes",
      "importance": "critical",
      "improvement_percent": 0.0,
      "label": "Portal payload",
      "plain": "Size of the served portal shell.",
      "status": "unchanged",
      "target": "Lower is better; below 350 KB currently earns efficiency credit.",
      "unit": "B",
      "why": "Large payloads hurt slow-link and tunnel usability."
    },
    {
      "baseline": 124050.29,
      "category": "storage",
      "claims_supported": [
        "scalability_cost"
      ],
      "current": 124050.29,
      "delta": 0.0,
      "higher_is_better": false,
      "id": "db_bytes_per_observation",
      "importance": "high",
      "improvement_percent": 0.0,
      "label": "DB bytes per observation",
      "plain": "Database size divided by accepted observations.",
      "status": "unchanged",
      "target": "Lower is better; below 150 KB per observation currently earns efficiency credit.",
      "unit": "B/obs",
      "why": "Shows storage efficiency and whether growth is becoming expensive."
    },
    {
      "baseline": 79.0,
      "category": "wire",
      "claims_supported": [
        "communications_efficiency"
      ],
      "current": 79.0,
      "delta": 0.0,
      "higher_is_better": true,
      "id": "wire_savings_percent",
      "importance": "high",
      "improvement_percent": 0.0,
      "label": "Wire savings",
      "plain": "Estimated savings of the binary wire frame compared with JSON.",
      "status": "unchanged",
      "target": "Higher is better; 60 percent or more currently earns efficiency credit.",
      "unit": "%",
      "why": "Shows whether the protocol is reducing transmission cost."
    }
  ],
  "metric_intelligence": [
    {
      "best": 68.8,
      "category": "throughput",
      "confidence": "thin",
      "gap_from_best_percent": 9.27,
      "improvement_streak": 0,
      "label": "Observation ingest throughput",
      "latest": 62.42,
      "metric": "observation_throughput_per_s",
      "previous": 68.8,
      "recommended_action": "Stabilize immediately with a focused repeat run and profiling pass.",
      "regression_streak": 1,
      "risk": "critical",
      "run_count": 2,
      "status": "regressed",
      "unit": "obs/s",
      "volatility_percent": 9.72,
      "why_it_matters": "Shows whether the system can keep up with incoming field data."
    },
    {
      "best": 14.888,
      "category": "latency",
      "confidence": "thin",
      "gap_from_best_percent": 5.01,
      "improvement_streak": 0,
      "label": "Query p95",
      "latest": 15.634,
      "metric": "query_p95_ms",
      "previous": 14.888,
      "recommended_action": "Stabilize immediately with a focused repeat run and profiling pass.",
      "regression_streak": 1,
      "risk": "critical",
      "run_count": 2,
      "status": "regressed",
      "unit": "ms",
      "volatility_percent": 4.89,
      "why_it_matters": "Shows whether operators and dashboards will feel responsive."
    },
    {
      "best": 9.0,
      "category": "coverage",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "Bathymetry points",
      "latest": 9.0,
      "metric": "bathymetry_points",
      "previous": 9.0,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "",
      "volatility_percent": 0.0,
      "why_it_matters": "Shows that terrain/depth data is included in the proof evidence."
    },
    {
      "best": 124050.29,
      "category": "storage",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "DB bytes per observation",
      "latest": 124050.29,
      "metric": "db_bytes_per_observation",
      "previous": 124050.29,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "B/obs",
      "volatility_percent": 0.0,
      "why_it_matters": "Shows storage efficiency and whether growth is becoming expensive."
    },
    {
      "best": 4.0,
      "category": "coverage",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "Mesh routes",
      "latest": 4.0,
      "metric": "mesh_routes",
      "previous": 4.0,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "",
      "volatility_percent": 0.0,
      "why_it_matters": "Shows whether route/network behavior is being exercised."
    },
    {
      "best": 306297.0,
      "category": "payload",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "Portal payload",
      "latest": 306297.0,
      "metric": "portal_html_bytes",
      "previous": 306297.0,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "B",
      "volatility_percent": 0.0,
      "why_it_matters": "Large payloads hurt slow-link and tunnel usability."
    },
    {
      "best": 7.0,
      "category": "coverage",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "Station features",
      "latest": 7.0,
      "metric": "station_features",
      "previous": 7.0,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "",
      "volatility_percent": 0.0,
      "why_it_matters": "Shows that station coverage is present rather than only raw observations."
    },
    {
      "best": 79.0,
      "category": "wire",
      "confidence": "thin",
      "gap_from_best_percent": 0.0,
      "improvement_streak": 0,
      "label": "Wire savings",
      "latest": 79.0,
      "metric": "wire_savings_percent",
      "previous": 79.0,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "%",
      "volatility_percent": 0.0,
      "why_it_matters": "Shows whether the protocol is reducing transmission cost."
    },
    {
      "best": 43.189,
      "category": "latency",
      "confidence": "thin",
      "gap_from_best_percent": 0.02,
      "improvement_streak": 0,
      "label": "Write p95",
      "latest": 43.197,
      "metric": "write_p95_ms",
      "previous": 43.189,
      "recommended_action": "Keep this in the regression suite while focusing on weaker metrics.",
      "regression_streak": 0,
      "risk": "stable",
      "run_count": 2,
      "status": "unchanged",
      "unit": "ms",
      "volatility_percent": 0.02,
      "why_it_matters": "Captures ingest responsiveness without being fooled by only average latency."
    }
  ],
  "next_actions": [
    {
      "detail": "Observation ingest throughput changed from 68.80 obs/s to 62.42 obs/s.",
      "metric": "observation_throughput_per_s",
      "priority": "P1",
      "source": "deterministic finding",
      "success_metric": "observation_throughput_per_s",
      "title": "Run repeatable ingest load tests and stabilize throughput measurement"
    },
    {
      "detail": "Query p95 changed from 14.89 ms to 15.63 ms.",
      "metric": "query_p95_ms",
      "priority": "P1",
      "source": "deterministic finding",
      "success_metric": "query_p95_ms",
      "title": "Profile slow read endpoints and add focused endpoint benchmarks"
    },
    {
      "detail": "Served portal shell is 306,297 B. Keep tracking public/tunnel load times.",
      "metric": "portal_html_bytes",
      "priority": "P2",
      "source": "deterministic finding",
      "success_metric": "portal_html_bytes",
      "title": "Track served portal payload and reduce static shell weight"
    },
    {
      "detail": "Current run used 124,050 B/obs. Validate this at larger sample counts.",
      "metric": "db_bytes_per_observation",
      "priority": "P2",
      "source": "deterministic finding",
      "success_metric": "db_bytes_per_observation",
      "title": "Measure storage growth at larger sample counts"
    }
  ],
  "operating_plan": {
    "decision_rules": [
      "If a critical metric regresses, stabilize it before adding new features.",
      "If a claim is thin, collect missing evidence before advertising improvement.",
      "If a metric improves, add a regression guard before moving on.",
      "If effort looks wasted, verify with issue, CI, or time-log data before changing priorities."
    ],
    "later": [
      {
        "confidence": "medium",
        "effort": "medium",
        "evidence_to_collect": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
        "impact": "high",
        "metric": "write_p95_ms, observation_throughput_per_s",
        "objective": "Strengthen claim: The system accepts and stores valid observations correctly.",
        "owner_role": "QA/project lead",
        "priority": "P1",
        "source": "QA matrix",
        "steps": [
          "Read the claim caveats and missing signals.",
          "Add the missing signal to the next proof run or project evidence import.",
          "Rerun the scenario and confirm the claim moves out of thin/gap status."
        ],
        "stop_condition": "Stop when the claim has adequate or strong evidence and no related P0/P1 regression.",
        "success_metric": "claim evidence score",
        "why_now": "Current claim evidence is adequate and affects trust in the system."
      },
      {
        "confidence": "medium",
        "effort": "medium",
        "evidence_to_collect": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
        "impact": "high",
        "metric": "query_p95_ms, portal_html_bytes, station_features",
        "objective": "Strengthen claim: Operators can retrieve useful current state quickly.",
        "owner_role": "QA/project lead",
        "priority": "P1",
        "source": "QA matrix",
        "steps": [
          "Read the claim caveats and missing signals.",
          "Add the missing signal to the next proof run or project evidence import.",
          "Rerun the scenario and confirm the claim moves out of thin/gap status."
        ],
        "stop_condition": "Stop when the claim has adequate or strong evidence and no related P0/P1 regression.",
        "success_metric": "claim evidence score",
        "why_now": "Current claim evidence is adequate and affects trust in the system."
      },
      {
        "confidence": "medium",
        "effort": "medium",
        "evidence_to_collect": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
        "impact": "high",
        "metric": "db_bytes_per_observation, observation_throughput_per_s, write_p95_ms, query_p95_ms",
        "objective": "Strengthen claim: Storage and performance costs are bounded as data grows.",
        "owner_role": "QA/project lead",
        "priority": "P1",
        "source": "QA matrix",
        "steps": [
          "Read the claim caveats and missing signals.",
          "Add the missing signal to the next proof run or project evidence import.",
          "Rerun the scenario and confirm the claim moves out of thin/gap status."
        ],
        "stop_condition": "Stop when the claim has adequate or strong evidence and no related P0/P1 regression.",
        "success_metric": "claim evidence score",
        "why_now": "Current claim evidence is adequate and affects trust in the system."
      }
    ],
    "north_star": "Every important claim should have a metric, a baseline, a trend, and a next experiment.",
    "review_questions": [
      "What is the single highest leverage test to run next?",
      "Which metric regression most weakens the claims?",
      "What should we stop doing until the evidence improves?",
      "What data source would most improve confidence?"
    ],
    "stop_doing": [
      {
        "better_option": "Repeat the same scenario after each meaningful change and compare against the matching baseline.",
        "reason": "A single run can be noise; the dashboard needs repeated comparable runs before calling progress real.",
        "title": "Do not chase one-off numbers"
      },
      {
        "better_option": "Import issue, CI, benchmark, or work-log data before making hard claims about wasted time.",
        "reason": "Time-spend and project-management claims are currently inferred, not directly imported.",
        "title": "Do not optimize unmeasured work"
      },
      {
        "better_option": "Close or explain deterministic findings before treating AI ideas as proof.",
        "reason": "AI is advisory; failed gates, regressions, and findings are the source of truth.",
        "title": "Do not bury deterministic findings under AI suggestions"
      }
    ],
    "summary": "2 metric(s) slipped against the latest comparable baseline.",
    "this_week": [
      {
        "confidence": "thin",
        "effort": "medium",
        "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
        "impact": "high",
        "metric": "observation_throughput_per_s",
        "objective": "Stabilize Observation ingest throughput",
        "owner_role": "Engineering",
        "priority": "P0",
        "source": "deterministic guidance",
        "steps": [
          "Run the same scenario used by the comparable baseline.",
          "Capture report.json and import it into Proof Lab.",
          "Check whether the target metric improved, stabilized, or regressed again.",
          "If it regresses again, profile the owning code path before adding new features."
        ],
        "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
        "success_metric": "observation_throughput_per_s",
        "why_now": "This metric regressed against the comparable baseline and is weakening proof confidence."
      },
      {
        "confidence": "thin",
        "effort": "medium",
        "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
        "impact": "high",
        "metric": "query_p95_ms",
        "objective": "Stabilize Query p95",
        "owner_role": "Engineering",
        "priority": "P0",
        "source": "deterministic guidance",
        "steps": [
          "Run the same scenario used by the comparable baseline.",
          "Capture report.json and import it into Proof Lab.",
          "Check whether the target metric improved, stabilized, or regressed again.",
          "If it regresses again, profile the owning code path before adding new features."
        ],
        "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
        "success_metric": "query_p95_ms",
        "why_now": "This metric regressed against the comparable baseline and is weakening proof confidence."
      },
      {
        "confidence": "thin",
        "effort": "medium",
        "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
        "impact": "high",
        "metric": "db_bytes_per_observation",
        "objective": "Storage Growth Curve",
        "owner_role": "Engineering",
        "priority": "P1",
        "source": "measurement plan",
        "steps": [
          "Run the same scenario used by the comparable baseline.",
          "Capture report.json and import it into Proof Lab.",
          "Check whether the target metric improved, stabilized, or regressed again.",
          "If it regresses again, profile the owning code path before adding new features."
        ],
        "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
        "success_metric": "DB bytes per observation stays flat or drops as sample size grows.",
        "why_now": "Storage cost must stay bounded as data volume grows beyond tiny demos."
      },
      {
        "confidence": "thin",
        "effort": "medium",
        "evidence_to_collect": "A fresh matching proof report plus before/after metric comparison.",
        "impact": "high",
        "metric": "portal_html_bytes",
        "objective": "Field-Link Portal Load",
        "owner_role": "Engineering",
        "priority": "P1",
        "source": "measurement plan",
        "steps": [
          "Run the same scenario used by the comparable baseline.",
          "Capture report.json and import it into Proof Lab.",
          "Check whether the target metric improved, stabilized, or regressed again.",
          "If it regresses again, profile the owning code path before adding new features."
        ],
        "stop_condition": "Do not move this to done until the metric is stable or improving across repeated comparable runs.",
        "success_metric": "Portal payload and load timing remain within the field-readiness threshold.",
        "why_now": "Slow links and tunnels need payload and load-time evidence, not only local browser checks."
      }
    ]
  },
  "progress_diagnostics": {
    "comparison_run_id": "local-proof-ai-llama",
    "headline": "2 metric(s) slipped against the latest comparable baseline.",
    "metric_history": [
      {
        "best": 68.8,
        "best_run_id": "local-proof-ai-llama",
        "category": "throughput",
        "explanation": "Observation ingest throughput moved the wrong direction against the previous matching run.",
        "first": 68.8,
        "gap_from_best_percent": 9.27,
        "higher_is_better": true,
        "id": "observation_throughput_per_s",
        "label": "Observation ingest throughput",
        "latest": 62.42,
        "plain": "How many observations the ingest path accepts per second.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 68.8
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 62.42
          }
        ],
        "previous": 68.8,
        "previous_change_percent": -9.27,
        "previous_status": "regressed",
        "run_count": 2,
        "target": "Higher is better; compare against the previous matching scenario.",
        "total_change_percent": -9.27,
        "total_status": "regressed",
        "unit": "obs/s",
        "why": "Shows whether the system can keep up with incoming field data."
      },
      {
        "best": 43.189,
        "best_run_id": "local-proof-ai-llama",
        "category": "latency",
        "explanation": "Write p95 is stable within the 2 percent noise band.",
        "first": 43.189,
        "gap_from_best_percent": 0.02,
        "higher_is_better": false,
        "id": "write_p95_ms",
        "label": "Write p95",
        "latest": 43.197,
        "plain": "The slow end of write latency; 95 percent of writes were faster than this.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 43.189
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 43.197
          }
        ],
        "previous": 43.189,
        "previous_change_percent": -0.02,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Lower is better; under 100 ms currently earns efficiency credit.",
        "total_change_percent": -0.02,
        "total_status": "unchanged",
        "unit": "ms",
        "why": "Captures ingest responsiveness without being fooled by only average latency."
      },
      {
        "best": 14.888,
        "best_run_id": "local-proof-ai-llama",
        "category": "latency",
        "explanation": "Query p95 moved the wrong direction against the previous matching run.",
        "first": 14.888,
        "gap_from_best_percent": 5.01,
        "higher_is_better": false,
        "id": "query_p95_ms",
        "label": "Query p95",
        "latest": 15.634,
        "plain": "The slow end of read/query latency; 95 percent of queries were faster than this.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 14.888
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 15.634
          }
        ],
        "previous": 14.888,
        "previous_change_percent": -5.01,
        "previous_status": "regressed",
        "run_count": 2,
        "target": "Lower is better; under 100 ms currently earns efficiency credit.",
        "total_change_percent": -5.01,
        "total_status": "regressed",
        "unit": "ms",
        "why": "Shows whether operators and dashboards will feel responsive."
      },
      {
        "best": 7.0,
        "best_run_id": "local-proof-ai-llama",
        "category": "coverage",
        "explanation": "Station features is stable within the 2 percent noise band.",
        "first": 7.0,
        "gap_from_best_percent": 0.0,
        "higher_is_better": true,
        "id": "station_features",
        "label": "Station features",
        "latest": 7.0,
        "plain": "Count of station features represented in the proof output.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 7.0
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 7.0
          }
        ],
        "previous": 7.0,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Higher is better; nonzero coverage earns effectiveness credit.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "",
        "why": "Shows that station coverage is present rather than only raw observations."
      },
      {
        "best": 9.0,
        "best_run_id": "local-proof-ai-llama",
        "category": "coverage",
        "explanation": "Bathymetry points is stable within the 2 percent noise band.",
        "first": 9.0,
        "gap_from_best_percent": 0.0,
        "higher_is_better": true,
        "id": "bathymetry_points",
        "label": "Bathymetry points",
        "latest": 9.0,
        "plain": "Count of bathymetry points available to the scenario.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 9.0
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 9.0
          }
        ],
        "previous": 9.0,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Higher is better; should grow with richer scenarios.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "",
        "why": "Shows that terrain/depth data is included in the proof evidence."
      },
      {
        "best": 4.0,
        "best_run_id": "local-proof-ai-llama",
        "category": "coverage",
        "explanation": "Mesh routes is stable within the 2 percent noise band.",
        "first": 4.0,
        "gap_from_best_percent": 0.0,
        "higher_is_better": true,
        "id": "mesh_routes",
        "label": "Mesh routes",
        "latest": 4.0,
        "plain": "Count of mesh routes represented in the scenario.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 4.0
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 4.0
          }
        ],
        "previous": 4.0,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Higher is better; nonzero routes earn effectiveness credit.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "",
        "why": "Shows whether route/network behavior is being exercised."
      },
      {
        "best": 306297.0,
        "best_run_id": "local-proof-ai-llama",
        "category": "payload",
        "explanation": "Portal payload is stable within the 2 percent noise band.",
        "first": 306297.0,
        "gap_from_best_percent": 0.0,
        "higher_is_better": false,
        "id": "portal_html_bytes",
        "label": "Portal payload",
        "latest": 306297.0,
        "plain": "Size of the served portal shell.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 306297.0
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 306297.0
          }
        ],
        "previous": 306297.0,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Lower is better; below 350 KB currently earns efficiency credit.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "B",
        "why": "Large payloads hurt slow-link and tunnel usability."
      },
      {
        "best": 124050.29,
        "best_run_id": "local-proof-ai-llama",
        "category": "storage",
        "explanation": "DB bytes per observation is stable within the 2 percent noise band.",
        "first": 124050.29,
        "gap_from_best_percent": 0.0,
        "higher_is_better": false,
        "id": "db_bytes_per_observation",
        "label": "DB bytes per observation",
        "latest": 124050.29,
        "plain": "Database size divided by accepted observations.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 124050.29
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 124050.29
          }
        ],
        "previous": 124050.29,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Lower is better; below 150 KB per observation currently earns efficiency credit.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "B/obs",
        "why": "Shows storage efficiency and whether growth is becoming expensive."
      },
      {
        "best": 79.0,
        "best_run_id": "local-proof-ai-llama",
        "category": "wire",
        "explanation": "Wire savings is stable within the 2 percent noise band.",
        "first": 79.0,
        "gap_from_best_percent": 0.0,
        "higher_is_better": true,
        "id": "wire_savings_percent",
        "label": "Wire savings",
        "latest": 79.0,
        "plain": "Estimated savings of the binary wire frame compared with JSON.",
        "points": [
          {
            "generated_at": "2026-06-01T07:53:00Z",
            "run_id": "local-proof-ai-llama",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-llama\\report.json",
            "value": 79.0
          },
          {
            "generated_at": "2026-06-01T07:55:35Z",
            "run_id": "local-proof-ai-final",
            "source_path": "<OMEGA-PROOF-ENV>\\OMEGA-wave\\artifacts\\omega-proof\\local-proof-ai-final\\report.json",
            "value": 79.0
          }
        ],
        "previous": 79.0,
        "previous_change_percent": 0.0,
        "previous_status": "unchanged",
        "run_count": 2,
        "target": "Higher is better; 60 percent or more currently earns efficiency credit.",
        "total_change_percent": 0.0,
        "total_status": "unchanged",
        "unit": "%",
        "why": "Shows whether the protocol is reducing transmission cost."
      }
    ],
    "not_working": [
      {
        "label": "Observation ingest throughput",
        "metric": "observation_throughput_per_s",
        "reason": "Observation ingest throughput regressed by 9.27 % against local-proof-ai-llama."
      },
      {
        "label": "Query p95",
        "metric": "query_p95_ms",
        "reason": "Query p95 regressed by 5.01 % against local-proof-ai-llama."
      }
    ],
    "stable": [
      {
        "label": "Write p95",
        "metric": "write_p95_ms",
        "reason": "Write p95 stayed within the 2 percent noise band."
      },
      {
        "label": "Station features",
        "metric": "station_features",
        "reason": "Station features stayed within the 2 percent noise band."
      },
      {
        "label": "Bathymetry points",
        "metric": "bathymetry_points",
        "reason": "Bathymetry points stayed within the 2 percent noise band."
      },
      {
        "label": "Mesh routes",
        "metric": "mesh_routes",
        "reason": "Mesh routes stayed within the 2 percent noise band."
      },
      {
        "label": "Portal payload",
        "metric": "portal_html_bytes",
        "reason": "Portal payload stayed within the 2 percent noise band."
      },
      {
        "label": "DB bytes per observation",
        "metric": "db_bytes_per_observation",
        "reason": "DB bytes per observation stayed within the 2 percent noise band."
      },
      {
        "label": "Wire savings",
        "metric": "wire_savings_percent",
        "reason": "Wire savings stayed within the 2 percent noise band."
      }
    ],
    "timeline": [
      {
        "baseline_run_id": null,
        "finding_count": 1,
        "generated_at": "2026-06-01T07:35:43Z",
        "improved_metric_count": 0,
        "posture": "baseline",
        "regressed_metric_count": 0,
        "run_id": "local-proof-smoke",
        "scenario_key": "coastal-demo:4h:60m",
        "score": 100.0,
        "unchanged_metric_count": 0
      },
      {
        "baseline_run_id": "local-proof-smoke",
        "finding_count": 3,
        "generated_at": "2026-06-01T07:43:55Z",
        "improved_metric_count": 0,
        "posture": "slipped",
        "regressed_metric_count": 3,
        "run_id": "local-proof-charts",
        "scenario_key": "coastal-demo:4h:60m",
        "score": 100.0,
        "unchanged_metric_count": 5
      },
      {
        "baseline_run_id": "local-proof-charts",
        "finding_count": 1,
        "generated_at": "2026-06-01T07:47:56Z",
        "improved_metric_count": 3,
        "posture": "advanced",
        "regressed_metric_count": 0,
        "run_id": "local-proof-ai",
        "scenario_key": "coastal-demo:4h:60m",
        "score": 100.0,
        "unchanged_metric_count": 6
      },
      {
        "baseline_run_id": "local-proof-ai",
        "finding_count": 2,
        "generated_at": "2026-06-01T07:51:58Z",
        "improved_metric_count": 2,
        "posture": "slipped",
        "regressed_metric_count": 1,
        "run_id": "local-proof-ai2",
        "scenario_key": "coastal-demo:4h:60m",
        "score": 100.0,
        "unchanged_metric_count": 6
      },
      {
        "baseline_run_id": null,
        "finding_count": 2,
        "generated_at": "2026-06-01T07:53:00Z",
        "improved_metric_count": 0,
        "posture": "baseline",
        "regressed_metric_count": 0,
        "run_id": "local-proof-ai-llama",
        "scenario_key": "coastal-demo:2h:60m",
        "score": 100.0,
        "unchanged_metric_count": 0
      },
      {
        "baseline_run_id": "local-proof-ai-llama",
        "finding_count": 4,
        "generated_at": "2026-06-01T07:55:35Z",
        "improved_metric_count": 0,
        "posture": "slipped",
        "regressed_metric_count": 2,
        "run_id": "local-proof-ai-final",
        "scenario_key": "coastal-demo:2h:60m",
        "score": 100.0,
        "unchanged_metric_count": 7
      }
    ],
    "why_ahead": [
      "Strong claim evidence: The proof includes meaningful environmental and route context.",
      "Strong claim evidence: The communications path is efficient enough for constrained links."
    ],
    "why_behind": [
      "Observation ingest throughput regressed from 68.80 obs/s to 62.42 obs/s.",
      "Query p95 regressed from 14.89 ms to 15.63 ms.",
      "Served portal shell is 306,297 B. Keep tracking public/tunnel load times.",
      "Current run used 124,050 B/obs. Validate this at larger sample counts.",
      "Observation ingest throughput changed from 68.80 obs/s to 62.42 obs/s.",
      "Query p95 changed from 14.89 ms to 15.63 ms."
    ],
    "working": []
  },
  "project_intelligence": {
    "domain_counts": {
      "documentation": 42,
      "evidence": 101,
      "firmware": 42,
      "hardware": 0,
      "software": 165
    },
    "project_count": 1,
    "projects": [
      {
        "detected_project_type": {
          "evidence_history": true,
          "firmware": true,
          "hardware": false,
          "software": true
        },
        "doc_files": 42,
        "evidence_files": 101,
        "evidence_gap_count": 0,
        "files_scanned": 374,
        "next_step": "Keep project plans current as code, tests, and evidence evolve.",
        "project_key": "omega",
        "project_name": "OMEGA",
        "source_files": 144,
        "test_files": 50,
        "test_to_source_percent": 34.7,
        "top_metric_terms": [
          "battery",
          "coverage",
          "current",
          "latency",
          "load",
          "p95"
        ]
      }
    ],
    "role_counts": {
      "config": 13,
      "doc": 42,
      "evidence": 101,
      "firmware": 42,
      "other": 24,
      "source": 102,
      "test": 50
    },
    "summary": "Project scan is connected across 1 project(s), with strongest signals in software, evidence, documentation.",
    "top_metric_terms": {
      "battery": 2,
      "coverage": 7,
      "current": 22,
      "latency": 13,
      "load": 26,
      "p95": 22,
      "power": 3,
      "storage": 8,
      "temperature": 4,
      "throughput": 22
    }
  },
  "project_management": {
    "active_measurement_count": 4,
    "active_scenario": "coastal-demo:2h:60m",
    "backlog_health_percent": 40.0,
    "baseline_run_id": "local-proof-ai-llama",
    "compared_metric_count": 9,
    "connected_source_count": 6,
    "evidence_coverage_percent": 100.0,
    "finding_counts": {
      "P1": 2,
      "P2": 2
    },
    "first_run_at": "2026-06-01T07:35:43+00:00",
    "improved_metric_count": 0,
    "latest_run_at": "2026-06-01T07:55:35+00:00",
    "missing_source_count": 2,
    "open_backlog_items": 4,
    "operating_action_count": 4,
    "planned_measurement_count": 12,
    "planned_project_count": 1,
    "priority_counts": {
      "P1": 2,
      "P2": 2
    },
    "progress_direction": "Needs attention",
    "regressed_metric_count": 2,
    "report_count": 6,
    "scenario_count": 2,
    "unchanged_metric_count": 7
  },
  "projects": [
    {
      "ai": {
        "available": true,
        "milestones": [
          {
            "exit_criteria": [
              "All claims verified",
              "All test cases completed"
            ],
            "name": "Complete deterministic plan"
          }
        ],
        "model": "llama3.2:latest",
        "next_steps": [
          "Implement robust testing and validation procedures for firmware development."
        ],
        "risk_register": [
          {
            "impact": "High",
            "mitigation": "Implement robust testing and validation procedures for firmware development.",
            "risk": "Unstable firmware"
          }
        ],
        "summary": "OMEGA Proof"
      },
      "ai_plan_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\ai-plan.json",
      "claims_to_verify": [
        {
          "claim": "The build performs its core user or operator workflow correctly.",
          "evidence": "End-to-end workflow tests, recorded run logs, and pass/fail criteria."
        },
        {
          "claim": "The build improves or preserves key performance metrics over time.",
          "evidence": "Comparable run history with latency, throughput, resource, and reliability trends."
        },
        {
          "claim": "The build is stable enough for repeated use.",
          "evidence": "Repeated runs, failure-rate tracking, soak tests, and regression thresholds."
        },
        {
          "claim": "Firmware starts reliably and handles device I/O safely.",
          "evidence": "Boot logs, hardware-in-the-loop tests, sensor/actuator traces, and fault injection."
        }
      ],
      "detected_project_type": {
        "evidence_history": true,
        "firmware": true,
        "hardware": false,
        "software": true
      },
      "domain_signals": {
        "documentation": 42,
        "evidence": 101,
        "firmware": 42,
        "hardware": 0,
        "software": 165
      },
      "evidence_gaps": [],
      "files_scanned": 374,
      "files_seen": 374,
      "generated_at": "2026-06-01T08:58:12Z",
      "metric_catalog": [
        {
          "metric": "test_pass_rate",
          "reason": "Baseline correctness and regression signal.",
          "unit": "%"
        },
        {
          "metric": "critical_workflow_success_rate",
          "reason": "Measures whether the product does what it claims.",
          "unit": "%"
        },
        {
          "metric": "p95_latency",
          "reason": "Tracks user-facing or control-loop responsiveness.",
          "unit": "ms"
        },
        {
          "metric": "throughput",
          "reason": "Tracks capacity and efficiency.",
          "unit": "units/s"
        },
        {
          "metric": "resource_cost",
          "reason": "Tracks efficiency across software and hardware.",
          "unit": "bytes/cpu/watts"
        },
        {
          "metric": "failure_rate",
          "reason": "Tracks stability and reliability.",
          "unit": "failures/run"
        }
      ],
      "metric_terms": {
        "battery": 2,
        "coverage": 7,
        "current": 22,
        "latency": 13,
        "load": 26,
        "p95": 22,
        "power": 3,
        "storage": 8,
        "temperature": 4,
        "throughput": 22,
        "voltage": 2
      },
      "plan_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\plan.json",
      "profile_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega\\profile.json",
      "project_key": "omega",
      "project_name": "OMEGA",
      "project_path": "<OMEGA-PROOF-ENV>\\omega-proof-lab\\.prooflab\\projects\\omega",
      "recommended_next_artifacts": [
        "claims.md: claims, acceptance thresholds, and evidence source for each claim",
        "metrics.json: stable metric ids, units, higher/lower-is-better, and thresholds",
        "scenarios/*.json: repeatable software, firmware, or bench scenarios",
        "reports/<run-id>/report.json: machine-readable results for every run"
      ],
      "role_counts": {
        "config": 13,
        "doc": 42,
        "evidence": 101,
        "firmware": 42,
        "other": 24,
        "source": 102,
        "test": 50
      },
      "test_matrix": [
        {
          "area": "requirements and claims",
          "automation": "plan check plus AI review",
          "evidence": "claims-to-metrics table",
          "test": "Map each public/internal claim to one measurable metric and one acceptance threshold."
        },
        {
          "area": "core workflow",
          "automation": "CLI, integration test, or hardware-in-loop script",
          "evidence": "report.json, logs, screenshots, or bench sheet",
          "test": "Run the smallest end-to-end scenario that proves the build can complete its main job."
        },
        {
          "area": "regression tracking",
          "automation": "Proof Lab run history",
          "evidence": "trend charts and comparison table",
          "test": "Repeat the same scenario after every meaningful change and compare to the previous matching run."
        },
        {
          "area": "stress and scale",
          "automation": "load test or extended bench run",
          "evidence": "capacity curve and failure threshold",
          "test": "Increase load, duration, dataset size, or duty cycle until a limit is observed."
        },
        {
          "area": "hardware validation",
          "automation": "instrumented bench script where possible",
          "evidence": "photos, measurements, serial logs, and pass/fail sheet",
          "test": "Run a bench checklist for power, thermal, mechanical fit, firmware boot, and I/O behavior."
        }
      ]
    }
  ],
  "qa_matrix": [
    {
      "claim": "The system accepts and stores valid observations correctly.",
      "claim_id": "correctness",
      "findings": [
        "Observation ingest throughput regressed"
      ],
      "metrics": [
        "write_p95_ms",
        "observation_throughput_per_s"
      ],
      "next_test": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
      "priority": "P1",
      "regressions": [
        "Observation ingest throughput"
      ],
      "score": 79.0,
      "status": "adequate"
    },
    {
      "claim": "Operators can retrieve useful current state quickly.",
      "claim_id": "operator_readiness",
      "findings": [
        "Query p95 regressed",
        "Portal payload is heavy for slow links"
      ],
      "metrics": [
        "query_p95_ms",
        "portal_html_bytes",
        "station_features"
      ],
      "next_test": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
      "priority": "P1",
      "regressions": [
        "Query p95"
      ],
      "score": 82.7,
      "status": "adequate"
    },
    {
      "claim": "The proof includes meaningful environmental and route context.",
      "claim_id": "environmental_context",
      "findings": [],
      "metrics": [
        "bathymetry_points",
        "mesh_routes",
        "station_features"
      ],
      "next_test": "Keep this claim in the regression suite and broaden scenario coverage.",
      "priority": "OK",
      "regressions": [],
      "score": 90.0,
      "status": "strong"
    },
    {
      "claim": "The communications path is efficient enough for constrained links.",
      "claim_id": "communications_efficiency",
      "findings": [
        "Portal payload is heavy for slow links"
      ],
      "metrics": [
        "wire_savings_percent",
        "portal_html_bytes"
      ],
      "next_test": "Keep this claim in the regression suite and broaden scenario coverage.",
      "priority": "P2",
      "regressions": [],
      "score": 90.0,
      "status": "strong"
    },
    {
      "claim": "Storage and performance costs are bounded as data grows.",
      "claim_id": "scalability_cost",
      "findings": [
        "Database cost per observation is high",
        "Observation ingest throughput regressed",
        "Query p95 regressed"
      ],
      "metrics": [
        "db_bytes_per_observation",
        "observation_throughput_per_s",
        "write_p95_ms",
        "query_p95_ms"
      ],
      "next_test": "Repeat the matching scenario and add the missing signals listed in claim caveats.",
      "priority": "P1",
      "regressions": [
        "Observation ingest throughput",
        "Query p95"
      ],
      "score": 79.0,
      "status": "adequate"
    }
  ],
  "run_count": 6,
  "series": [
    {
      "generated_at": "2026-06-01T07:35:43Z",
      "observation_throughput_per_s": 67.12,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 9.186,
      "run_id": "local-proof-smoke",
      "scenario_key": "coastal-demo:4h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 30.872
    },
    {
      "generated_at": "2026-06-01T07:43:55Z",
      "observation_throughput_per_s": 51.84,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 9.619,
      "run_id": "local-proof-charts",
      "scenario_key": "coastal-demo:4h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 32.503
    },
    {
      "generated_at": "2026-06-01T07:47:56Z",
      "observation_throughput_per_s": 71.03,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 8.825,
      "run_id": "local-proof-ai",
      "scenario_key": "coastal-demo:4h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 27.299
    },
    {
      "generated_at": "2026-06-01T07:51:58Z",
      "observation_throughput_per_s": 74.78,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 8.135,
      "run_id": "local-proof-ai2",
      "scenario_key": "coastal-demo:4h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 36.889
    },
    {
      "generated_at": "2026-06-01T07:53:00Z",
      "observation_throughput_per_s": 68.8,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 14.888,
      "run_id": "local-proof-ai-llama",
      "scenario_key": "coastal-demo:2h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 43.189
    },
    {
      "generated_at": "2026-06-01T07:55:35Z",
      "observation_throughput_per_s": 62.42,
      "portal_html_bytes": 306297.0,
      "query_p95_ms": 15.634,
      "run_id": "local-proof-ai-final",
      "scenario_key": "coastal-demo:2h:60m",
      "score": 100.0,
      "wire_savings_percent": 79.0,
      "write_p95_ms": 43.197
    }
  ],
  "summary": {
    "active_measurement_count": 4,
    "backlog_health_percent": 40.0,
    "baseline_run_id": "local-proof-ai-llama",
    "best_score": 100.0,
    "connected_source_count": 6,
    "data_quality_label": "thin",
    "data_quality_score": 65.0,
    "evidence_coverage_percent": 100.0,
    "health_label": "Watch",
    "improved_metrics": [],
    "latest_run_id": "local-proof-ai-final",
    "latest_scenario_key": "coastal-demo:2h:60m",
    "latest_score": {
      "correctness": 40.0,
      "effectiveness": 35.0,
      "efficiency": 25.0,
      "total": 100.0
    },
    "matching_scenario_run_count": 2,
    "mean_score": 100.0,
    "missing_source_count": 2,
    "open_findings": 4,
    "overall_health": 84.4,
    "planned_measurement_count": 12,
    "planned_project_count": 1,
    "progress_direction": "Needs attention",
    "regressed_metrics": [
      "Observation ingest throughput",
      "Query p95"
    ],
    "run_count": 6
  },
  "work_guidance": {
    "avoid": [
      {
        "better_option": "Repeat the same scenario after each meaningful change and compare against the matching baseline.",
        "reason": "A single run can be noise; the dashboard needs repeated comparable runs before calling progress real.",
        "title": "Do not chase one-off numbers"
      },
      {
        "better_option": "Import issue, CI, benchmark, or work-log data before making hard claims about wasted time.",
        "reason": "Time-spend and project-management claims are currently inferred, not directly imported.",
        "title": "Do not optimize unmeasured work"
      },
      {
        "better_option": "Close or explain deterministic findings before treating AI ideas as proof.",
        "reason": "AI is advisory; failed gates, regressions, and findings are the source of truth.",
        "title": "Do not bury deterministic findings under AI suggestions"
      }
    ],
    "basis": "Deterministic guidance from metric comparisons, QA matrix, effort focus, data-quality checks, and measurement plan.",
    "decision_rules": [
      "If a critical metric regresses, stabilize it before adding new features.",
      "If a claim is thin, collect missing evidence before advertising improvement.",
      "If a metric improves, add a regression guard before moving on.",
      "If effort looks wasted, verify with issue, CI, or time-log data before changing priorities."
    ],
    "focus_now": [
      {
        "metric": "observation_throughput_per_s",
        "next_step": "Run a focused repeat of the matching scenario, then isolate the code path or data path that changed.",
        "priority": "P0",
        "reason": "This metric regressed against the comparable baseline and is weakening proof confidence.",
        "source": "deterministic guidance",
        "success_metric": "observation_throughput_per_s",
        "title": "Stabilize Observation ingest throughput"
      },
      {
        "metric": "query_p95_ms",
        "next_step": "Run a focused repeat of the matching scenario, then isolate the code path or data path that changed.",
        "priority": "P0",
        "reason": "This metric regressed against the comparable baseline and is weakening proof confidence.",
        "source": "deterministic guidance",
        "success_metric": "query_p95_ms",
        "title": "Stabilize Query p95"
      },
      {
        "metric": "db_bytes_per_observation",
        "next_step": "Run increasing observation counts and chart bytes per observation over time.",
        "priority": "P1",
        "reason": "Storage cost must stay bounded as data volume grows beyond tiny demos.",
        "source": "measurement plan",
        "success_metric": "DB bytes per observation stays flat or drops as sample size grows.",
        "title": "Storage Growth Curve"
      },
      {
        "metric": "portal_html_bytes",
        "next_step": "Measure payload bytes, compressed bytes, first response, and full load time on a constrained link.",
        "priority": "P1",
        "reason": "Slow links and tunnels need payload and load-time evidence, not only local browser checks.",
        "source": "measurement plan",
        "success_metric": "Portal payload and load timing remain within the field-readiness threshold.",
        "title": "Field-Link Portal Load"
      }
    ],
    "missing_direct_management_data": [
      "Issue status and cycle time",
      "CI duration and flake rate",
      "Manual test or bench-session duration",
      "Milestone estimates and actuals"
    ],
    "next_ai_questions": [
      "What is the single highest leverage test to run next?",
      "Which metric regression most weakens the claims?",
      "What should we stop doing until the evidence improves?",
      "What data source would most improve confidence?"
    ],
    "preserve": [],
    "summary": "2 metric(s) slipped against the latest comparable baseline.",
    "work_better": [
      {
        "habit": "Plan one change, run one matching proof scenario, save the report, then review the regression and QA matrix.",
        "title": "Use a tight evidence loop",
        "why": "This makes progress attributable instead of mixing several changes into one unclear result."
      },
      {
        "habit": "Add metrics as structured report fields instead of notes whenever possible.",
        "title": "Keep proof reports small but complete",
        "why": "Structured data feeds charts, AI review, reports, and trend analysis automatically."
      },
      {
        "habit": "Use current values to prove presence, but use matching baselines and repeated runs to prove improvement.",
        "title": "Separate current-state proof from improvement proof",
        "why": "This prevents the tool from overstating progress when it only has a snapshot."
      },
      {
        "habit": "Start with: Observation sample is large enough.",
        "title": "Close data-quality gaps before polishing",
        "why": "Latest run has 21 observations; larger samples make performance/storage claims stronger."
      }
    ]
  },
  "workflow_health": {
    "active_measurement_percent": 33.3,
    "ai_available": true,
    "connected_source_percent": 66.7,
    "improvement_levers": [
      "Increase repeat depth to at least three matching runs per important scenario.",
      "Connect issue/CI, bench, field, or work-log sources so project-management claims stop being inferred.",
      "Promote planned metrics into active report fields.",
      "Close data-quality gaps before treating improvements as durable."
    ],
    "label": "thin",
    "missing_operational_inputs": [
      "Field And Bench Logs",
      "Issue And CI History"
    ],
    "repeat_depth": 2,
    "runs_per_week": 1008.0,
    "score": 64.4
  }
};
