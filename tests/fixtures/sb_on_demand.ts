/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sb_on_demand.json`.
 */
export type SbOnDemand = {
  address: "Aio4gaXjXzJNVLtzwtNVmSqGKpANtXhybbkhtAC94ji2";
  metadata: {
    name: "sbOnDemand";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "guardianQuoteVerify";
      discriminator: [168, 36, 93, 156, 157, 150, 148, 45];
      accounts: [
        {
          name: "guardian";
          writable: true;
        },
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["oracle"];
        },
        {
          name: "guardianQueue";
          writable: true;
          relations: ["state"];
        },
        {
          name: "state";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "guardianQuoteVerifyParams";
            };
          };
        },
      ];
    },
    {
      name: "guardianRegister";
      discriminator: [159, 76, 53, 117, 219, 29, 116, 135];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "state";
        },
        {
          name: "guardianQueue";
          relations: ["state"];
        },
        {
          name: "authority";
          signer: true;
          relations: ["state"];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "guardianRegisterParams";
            };
          };
        },
      ];
    },
    {
      name: "guardianUnregister";
      discriminator: [215, 19, 61, 120, 155, 224, 120, 60];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "state";
        },
        {
          name: "guardianQueue";
          writable: true;
          relations: ["state"];
        },
        {
          name: "authority";
          signer: true;
          relations: ["state"];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "guardianUnregisterParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleHeartbeat";
      discriminator: [10, 175, 217, 130, 111, 35, 117, 54];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "oracleStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "oracle";
              },
            ];
          };
        },
        {
          name: "oracleSigner";
          signer: true;
        },
        {
          name: "queue";
          writable: true;
          relations: ["oracle", "gcNode"];
        },
        {
          name: "gcNode";
          writable: true;
        },
        {
          name: "programState";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "nativeMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "queueEscrow";
          writable: true;
        },
        {
          name: "stakeProgram";
        },
        {
          name: "delegationPool";
        },
        {
          name: "delegationGroup";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleHeartbeatParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleHeartbeatV2";
      discriminator: [122, 231, 66, 32, 226, 62, 144, 103];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "oracleStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "oracle";
              },
            ];
          };
        },
        {
          name: "oracleSigner";
          signer: true;
        },
        {
          name: "queue";
          writable: true;
          relations: ["oracle", "gcNode"];
        },
        {
          name: "gcNode";
          writable: true;
        },
        {
          name: "programState";
          writable: true;
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleHeartbeatV2Params";
            };
          };
        },
      ];
    },
    {
      name: "oracleInit";
      discriminator: [21, 158, 66, 65, 60, 221, 148, 61];
      accounts: [
        {
          name: "oracle";
          writable: true;
          signer: true;
        },
        {
          name: "oracleStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "oracle";
              },
            ];
          };
        },
        {
          name: "programState";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleInitParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleInitSvm";
      discriminator: [106, 20, 36, 117, 166, 175, 131, 83];
      accounts: [
        {
          name: "oracle";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [79, 114, 97, 99, 108, 101];
              },
              {
                kind: "arg";
                path: "params.queue";
              },
              {
                kind: "arg";
                path: "params.source_oracle_key";
              },
            ];
          };
        },
        {
          name: "oracleStats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [79, 114, 97, 99, 108, 101, 83, 116, 97, 116, 115];
              },
              {
                kind: "account";
                path: "oracle";
              },
            ];
          };
        },
        {
          name: "programState";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleInitSvmParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleResetLut";
      discriminator: [147, 244, 108, 198, 152, 219, 0, 22];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["oracle"];
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleResetLutParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleSetConfigs";
      discriminator: [129, 111, 223, 4, 191, 188, 70, 180];
      accounts: [
        {
          name: "oracle";
        },
        {
          name: "authority";
          signer: true;
          relations: ["oracle"];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleSetConfigsParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleSetOperator";
      discriminator: [210, 232, 155, 124, 69, 176, 242, 133];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["oracle"];
        },
        {
          name: "operator";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleSetOperatorParams";
            };
          };
        },
      ];
    },
    {
      name: "oracleSyncLut";
      discriminator: [138, 99, 12, 59, 18, 170, 171, 45];
      accounts: [
        {
          name: "oracle";
        },
        {
          name: "queue";
          relations: ["oracle"];
        },
        {
          name: "ncn";
        },
        {
          name: "vault";
        },
        {
          name: "state";
        },
        {
          name: "authority";
          signer: true;
          relations: ["oracle"];
        },
        {
          name: "operator";
          relations: ["oracle"];
        },
        {
          name: "ncnOperatorState";
        },
        {
          name: "operatorVaultTicket";
        },
        {
          name: "vaultOperatorDelegation";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
        {
          name: "payer";
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "oracleSyncLutParams";
            };
          };
        },
      ];
    },
    {
      name: "permissionSet";
      discriminator: [211, 122, 185, 120, 129, 182, 55, 103];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "granter";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "permissionSetParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedClose";
      discriminator: [19, 134, 50, 142, 177, 215, 196, 83];
      accounts: [
        {
          name: "pullFeed";
          writable: true;
        },
        {
          name: "rewardEscrow";
          writable: true;
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "lutSigner";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "state";
        },
        {
          name: "authority";
          writable: true;
          signer: true;
          relations: ["pullFeed"];
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedCloseParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedInit";
      discriminator: [198, 130, 53, 198, 235, 61, 143, 40];
      accounts: [
        {
          name: "pullFeed";
          writable: true;
          signer: true;
        },
        {
          name: "queue";
        },
        {
          name: "authority";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
        },
        {
          name: "rewardEscrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "pullFeed";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "wrappedSolMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "wrappedSolMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedInitParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSetConfigs";
      discriminator: [217, 45, 11, 246, 64, 26, 82, 168];
      accounts: [
        {
          name: "pullFeed";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["pullFeed"];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSetConfigsParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSubmitResponse";
      discriminator: [150, 22, 215, 166, 143, 93, 48, 137];
      accounts: [
        {
          name: "feed";
          writable: true;
        },
        {
          name: "queue";
          relations: ["feed"];
        },
        {
          name: "programState";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rewardVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "tokenMint";
          address: "So11111111111111111111111111111111111111112";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSubmitResponseParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSubmitResponseConsensus";
      discriminator: [239, 124, 39, 184, 147, 222, 16, 248];
      accounts: [
        {
          name: "queue";
        },
        {
          name: "programState";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rewardVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "tokenMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "ixSysvar";
          address: "Sysvar1nstructions1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSubmitResponseConsensusParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSubmitResponseConsensusLight";
      discriminator: [178, 179, 88, 144, 175, 130, 157, 87];
      accounts: [
        {
          name: "queue";
        },
        {
          name: "programState";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "ixSysvar";
          address: "Sysvar1nstructions1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSubmitResponseConsensusLightParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSubmitResponseMany";
      discriminator: [47, 156, 45, 25, 200, 71, 37, 215];
      accounts: [
        {
          name: "queue";
        },
        {
          name: "programState";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rewardVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "tokenMint";
          address: "So11111111111111111111111111111111111111112";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSubmitResponseManyParams";
            };
          };
        },
      ];
    },
    {
      name: "pullFeedSubmitResponseSvm";
      discriminator: [123, 7, 190, 12, 220, 230, 198, 148];
      accounts: [
        {
          name: "feed";
          writable: true;
        },
        {
          name: "queue";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [81, 117, 101, 117, 101];
              },
              {
                kind: "arg";
                path: "params.source_queue_key";
              },
            ];
          };
          relations: ["feed"];
        },
        {
          name: "programState";
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rewardVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "tokenMint";
          address: "So11111111111111111111111111111111111111112";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "pullFeedSubmitResponseSvmParams";
            };
          };
        },
      ];
    },
    {
      name: "queueAddMrEnclave";
      discriminator: [199, 255, 81, 50, 60, 133, 171, 138];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "programAuthority";
        },
        {
          name: "state";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueAddMrEnclaveParams";
            };
          };
        },
      ];
    },
    {
      name: "queueAllowSubsidies";
      discriminator: [94, 203, 82, 157, 188, 138, 202, 108];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["state"];
        },
        {
          name: "state";
          writable: true;
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueAllowSubsidiesParams";
            };
          };
        },
      ];
    },
    {
      name: "queueGarbageCollect";
      discriminator: [187, 208, 104, 247, 16, 91, 96, 98];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueGarbageCollectParams";
            };
          };
        },
      ];
    },
    {
      name: "queueInit";
      discriminator: [144, 18, 99, 145, 133, 27, 207, 13];
      accounts: [
        {
          name: "queue";
          writable: true;
          signer: true;
        },
        {
          name: "queueEscrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "queue";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "nativeMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "authority";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "nativeMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "programState";
        },
        {
          name: "lutSigner";
          writable: true;
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueInitParams";
            };
          };
        },
      ];
    },
    {
      name: "queueInitSvm";
      discriminator: [175, 94, 119, 151, 45, 144, 173, 235];
      accounts: [
        {
          name: "queue";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [81, 117, 101, 117, 101];
              },
              {
                kind: "arg";
                path: "params.source_queue_key";
              },
            ];
          };
        },
        {
          name: "queueEscrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "queue";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "nativeMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "authority";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "nativeMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "programState";
        },
        {
          name: "lutSigner";
          writable: true;
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueInitSvmParams";
            };
          };
        },
      ];
    },
    {
      name: "queueOverrideSvm";
      discriminator: [43, 103, 15, 35, 89, 14, 244, 165];
      accounts: [
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueOverrideSvmParams";
            };
          };
        },
      ];
    },
    {
      name: "queuePayRewards";
      discriminator: [67, 87, 149, 166, 56, 112, 20, 12];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "programState";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "vault";
        },
        {
          name: "rewardVault";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "wsolMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "escrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "payer";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "wsolMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queuePayRewardsParams";
            };
          };
        },
      ];
    },
    {
      name: "queuePaySubsidy";
      discriminator: [85, 84, 51, 251, 144, 57, 105, 200];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "programState";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "vault";
        },
        {
          name: "rewardVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "vault";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "switchMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "subsidyVault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "programState";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "switchMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "wsolMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "switchMint";
        },
        {
          name: "vaultConfig";
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queuePaySubsidyParams";
            };
          };
        },
      ];
    },
    {
      name: "queueRemoveMrEnclave";
      discriminator: [3, 64, 135, 33, 190, 133, 68, 252];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "programAuthority";
        },
        {
          name: "state";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueRemoveMrEnclaveParams";
            };
          };
        },
      ];
    },
    {
      name: "queueResetLut";
      discriminator: [224, 85, 0, 204, 71, 42, 11, 242];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["queue"];
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "programState";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueResetLutParams";
            };
          };
        },
      ];
    },
    {
      name: "queueResetVault";
      discriminator: [232, 255, 48, 111, 240, 168, 253, 40];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
        {
          name: "ncn";
          relations: ["queue"];
        },
        {
          name: "vault";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueResetVaultParams";
            };
          };
        },
      ];
    },
    {
      name: "queueSetConfigs";
      discriminator: [54, 183, 243, 199, 49, 103, 142, 48];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueSetConfigsParams";
            };
          };
        },
      ];
    },
    {
      name: "queueSetNcn";
      discriminator: [232, 223, 179, 12, 20, 136, 181, 219];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
        {
          name: "ncn";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueSetNcnParams";
            };
          };
        },
      ];
    },
    {
      name: "queueSetVault";
      discriminator: [48, 47, 102, 99, 241, 249, 196, 246];
      accounts: [
        {
          name: "queue";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "state";
        },
        {
          name: "ncn";
          relations: ["queue"];
        },
        {
          name: "vault";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "queueSetVaultParams";
            };
          };
        },
      ];
    },
    {
      name: "randomnessCommit";
      discriminator: [52, 170, 152, 201, 179, 133, 242, 141];
      accounts: [
        {
          name: "randomness";
          writable: true;
        },
        {
          name: "queue";
          relations: ["randomness", "oracle"];
        },
        {
          name: "oracle";
          writable: true;
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "authority";
          signer: true;
          relations: ["randomness"];
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "randomnessCommitParams";
            };
          };
        },
      ];
    },
    {
      name: "randomnessInit";
      discriminator: [9, 9, 204, 33, 50, 116, 113, 15];
      accounts: [
        {
          name: "randomness";
          writable: true;
          signer: true;
        },
        {
          name: "rewardEscrow";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "randomness";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "wrappedSolMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "queue";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "wrappedSolMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "programState";
        },
        {
          name: "lutSigner";
        },
        {
          name: "lut";
          writable: true;
        },
        {
          name: "addressLookupTableProgram";
          address: "AddressLookupTab1e1111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "randomnessInitParams";
            };
          };
        },
      ];
    },
    {
      name: "randomnessReveal";
      discriminator: [197, 181, 187, 10, 30, 58, 20, 73];
      accounts: [
        {
          name: "randomness";
          writable: true;
        },
        {
          name: "oracle";
          relations: ["randomness"];
        },
        {
          name: "queue";
          relations: ["oracle"];
        },
        {
          name: "stats";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  79,
                  114,
                  97,
                  99,
                  108,
                  101,
                  82,
                  97,
                  110,
                  100,
                  111,
                  109,
                  110,
                  101,
                  115,
                  115,
                  83,
                  116,
                  97,
                  116,
                  115,
                ];
              },
              {
                kind: "account";
                path: "oracle";
              },
            ];
          };
        },
        {
          name: "authority";
          signer: true;
          relations: ["randomness"];
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "recentSlothashes";
          address: "SysvarS1otHashes111111111111111111111111111";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rewardEscrow";
          writable: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "wrappedSolMint";
          address: "So11111111111111111111111111111111111111112";
        },
        {
          name: "programState";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "randomnessRevealParams";
            };
          };
        },
      ];
    },
    {
      name: "stateInit";
      discriminator: [103, 241, 106, 190, 217, 153, 87, 105];
      accounts: [
        {
          name: "state";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [83, 84, 65, 84, 69];
              },
            ];
          };
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "stateInitParams";
            };
          };
        },
      ];
    },
    {
      name: "stateSetConfigs";
      discriminator: [40, 98, 76, 37, 206, 9, 47, 144];
      accounts: [
        {
          name: "state";
          writable: true;
        },
        {
          name: "authority";
          signer: true;
          relations: ["state"];
        },
        {
          name: "queue";
          writable: true;
        },
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "stateSetConfigsParams";
            };
          };
        },
      ];
    },
    {
      name: "testUpdateOracleStats";
      discriminator: [175, 48, 162, 252, 154, 197, 149, 187];
      accounts: [
        {
          name: "oracleStats";
          docs: ["The OracleStats account to update."];
          writable: true;
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "testUpdateOracleStatsParams";
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "oracleAccountData";
      discriminator: [128, 30, 16, 241, 170, 73, 55, 54];
    },
    {
      name: "oracleStatsAccountData";
      discriminator: [180, 157, 178, 234, 240, 27, 152, 179];
    },
    {
      name: "pullFeedAccountData";
      discriminator: [196, 27, 108, 196, 10, 215, 219, 40];
    },
    {
      name: "queueAccountData";
      discriminator: [217, 194, 55, 127, 184, 83, 138, 1];
    },
    {
      name: "randomnessAccountData";
      discriminator: [10, 66, 229, 135, 220, 239, 217, 114];
    },
    {
      name: "state";
      discriminator: [216, 146, 107, 94, 104, 75, 182, 177];
    },
  ];
  events: [
    {
      name: "costWhitelistEvent";
      discriminator: [56, 107, 191, 127, 116, 6, 138, 149];
    },
    {
      name: "garbageCollectionEvent";
      discriminator: [232, 235, 2, 188, 8, 143, 145, 237];
    },
    {
      name: "guardianQuoteVerifyEvent";
      discriminator: [31, 37, 39, 6, 214, 186, 33, 115];
    },
    {
      name: "oracleHeartbeatEvent";
      discriminator: [52, 29, 166, 2, 94, 7, 188, 13];
    },
    {
      name: "oracleInitEvent";
      discriminator: [89, 193, 219, 200, 1, 83, 167, 24];
    },
    {
      name: "oracleQuoteOverrideEvent";
      discriminator: [78, 204, 191, 210, 164, 196, 244, 65];
    },
    {
      name: "oracleQuoteRotateEvent";
      discriminator: [26, 189, 196, 192, 225, 127, 26, 228];
    },
    {
      name: "oracleQuoteVerifyRequestEvent";
      discriminator: [203, 209, 79, 0, 20, 71, 226, 202];
    },
    {
      name: "permissionSetEvent";
      discriminator: [148, 86, 123, 0, 102, 20, 119, 206];
    },
    {
      name: "pullFeedErrorValueEvent";
      discriminator: [225, 80, 192, 95, 14, 12, 83, 192];
    },
    {
      name: "pullFeedValueEvents";
      discriminator: [86, 7, 231, 28, 122, 161, 117, 69];
    },
    {
      name: "queueAddMrEnclaveEvent";
      discriminator: [170, 186, 175, 38, 216, 51, 69, 175];
    },
    {
      name: "queueInitEvent";
      discriminator: [44, 137, 99, 227, 107, 8, 30, 105];
    },
    {
      name: "queueRemoveMrEnclaveEvent";
      discriminator: [4, 105, 196, 60, 84, 122, 203, 196];
    },
    {
      name: "randomnessCommitEvent";
      discriminator: [88, 60, 172, 90, 112, 10, 206, 147];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "genericError";
    },
    {
      code: 6001;
      name: "invalidQuote";
    },
    {
      code: 6002;
      name: "insufficientQueue";
    },
    {
      code: 6003;
      name: "queueFull";
    },
    {
      code: 6004;
      name: "invalidEnclaveSigner";
    },
    {
      code: 6005;
      name: "invalidSigner";
    },
    {
      code: 6006;
      name: "mrEnclaveAlreadyExists";
    },
    {
      code: 6007;
      name: "mrEnclaveAtCapacity";
    },
    {
      code: 6008;
      name: "mrEnclaveDoesntExist";
    },
    {
      code: 6009;
      name: "permissionDenied";
    },
    {
      code: 6010;
      name: "invalidQueue";
    },
    {
      code: 6011;
      name: "incorrectMrEnclave";
    },
    {
      code: 6012;
      name: "invalidAuthority";
    },
    {
      code: 6013;
      name: "invalidMrEnclave";
    },
    {
      code: 6014;
      name: "invalidTimestamp";
    },
    {
      code: 6015;
      name: "invalidOracleIdx";
    },
    {
      code: 6016;
      name: "invalidSecpSignature";
    },
    {
      code: 6017;
      name: "invalidGuardianQueue";
    },
    {
      code: 6018;
      name: "invalidIndex";
    },
    {
      code: 6019;
      name: "invalidOracleQueue";
    },
    {
      code: 6020;
      name: "invalidPermission";
    },
    {
      code: 6021;
      name: "invalidePermissionedAccount";
    },
    {
      code: 6022;
      name: "invalidEpochRotate";
    },
    {
      code: 6023;
      name: "invalidEpochFinalize";
    },
    {
      code: 6024;
      name: "invalidEscrow";
    },
    {
      code: 6025;
      name: "illegalOracle";
    },
    {
      code: 6026;
      name: "illegalExecuteAttempt";
    },
    {
      code: 6027;
      name: "illegalFeedValue";
    },
    {
      code: 6028;
      name: "invalidOracleFeedStats";
    },
    {
      code: 6029;
      name: "invalidStateAuthority";
    },
    {
      code: 6030;
      name: "notEnoughSamples";
    },
    {
      code: 6031;
      name: "oracleIsVerified";
    },
    {
      code: 6032;
      name: "queueIsEmpty";
    },
    {
      code: 6033;
      name: "secpRecoverFailure";
    },
    {
      code: 6034;
      name: "staleSample";
    },
    {
      code: 6035;
      name: "switchboardRandomnessTooOld";
    },
    {
      code: 6036;
      name: "epochIdMismatch";
    },
    {
      code: 6037;
      name: "guardianAlreadyVoted";
    },
    {
      code: 6038;
      name: "randomnessNotRequested";
    },
    {
      code: 6039;
      name: "invalidSlotNumber";
    },
    {
      code: 6040;
      name: "randomnessOracleKeyExpired";
    },
    {
      code: 6041;
      name: "invalidAdvisory";
    },
    {
      code: 6042;
      name: "invalidOracleStats";
    },
    {
      code: 6043;
      name: "invalidStakeProgram";
    },
    {
      code: 6044;
      name: "invalidStakePool";
    },
    {
      code: 6045;
      name: "invalidDelegationPool";
    },
    {
      code: 6046;
      name: "unparsableAccount";
    },
    {
      code: 6047;
      name: "invalidInstruction";
    },
    {
      code: 6048;
      name: "oracleAlreadyVerified";
    },
    {
      code: 6049;
      name: "guardianNotVerified";
    },
    {
      code: 6050;
      name: "invalidConstraint";
    },
    {
      code: 6051;
      name: "invalidDelegationGroup";
    },
    {
      code: 6052;
      name: "oracleKeyNotFound";
    },
    {
      code: 6053;
      name: "guardianReregisterAttempt";
    },
    {
      code: 6054;
      name: "invalidManySubmissionCount";
    },
    {
      code: 6055;
      name: "missingSecpIx";
    },
    {
      code: 6056;
      name: "checksumMismatch";
    },
    {
      code: 6057;
      name: "invalidSubmissionFeedsCount";
    },
    {
      code: 6058;
      name: "invalidSecpSignatureOraclesCount";
    },
    {
      code: 6059;
      name: "invalidEthAddress";
    },
    {
      code: 6060;
      name: "noLutKeysAdded";
    },
    {
      code: 6061;
      name: "invalidVaultOperatorDelegation";
    },
    {
      code: 6062;
      name: "invalidVaultTokenAccount";
    },
    {
      code: 6063;
      name: "invalidRemainingAccounts";
    },
    {
      code: 6064;
      name: "subsidiesNotAllowed";
    },
    {
      code: 6065;
      name: "missingVod";
    },
    {
      code: 6066;
      name: "invalidVodEpoch";
    },
    {
      code: 6067;
      name: "invalidOracleSubsidyWallet";
    },
    {
      code: 6068;
      name: "invalidOperator";
    },
    {
      code: 6069;
      name: "max128SampleValue";
    },
    {
      code: 6070;
      name: "rewardAlreadyPaid";
    },
    {
      code: 6071;
      name: "invalidOracleAuthority";
    },
    {
      code: 6072;
      name: "invalidRewardVault";
    },
  ];
  types: [
    {
      name: "compactResult";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "stdDev";
            docs: [
              "The standard deviation of the submissions needed for quorom size",
            ];
            type: "f32";
          },
          {
            name: "mean";
            docs: ["The mean of the submissions needed for quorom size"];
            type: "f32";
          },
          {
            name: "slot";
            docs: ["The slot at which this value was signed."];
            type: "u64";
          },
        ];
      };
    },
    {
      name: "costWhitelistEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feeds";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "oracles";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "values";
            type: {
              vec: {
                vec: "i128";
              };
            };
          },
          {
            name: "reward";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "currentResult";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "value";
            docs: [
              "The median value of the submissions needed for quorom size",
            ];
            type: "i128";
          },
          {
            name: "stdDev";
            docs: [
              "The standard deviation of the submissions needed for quorom size",
            ];
            type: "i128";
          },
          {
            name: "mean";
            docs: ["The mean of the submissions needed for quorom size"];
            type: "i128";
          },
          {
            name: "range";
            docs: ["The range of the submissions needed for quorom size"];
            type: "i128";
          },
          {
            name: "minValue";
            docs: [
              "The minimum value of the submissions needed for quorom size",
            ];
            type: "i128";
          },
          {
            name: "maxValue";
            docs: [
              "The maximum value of the submissions needed for quorom size",
            ];
            type: "i128";
          },
          {
            name: "numSamples";
            docs: ["The number of samples used to calculate this result"];
            type: "u8";
          },
          {
            name: "submissionIdx";
            docs: [
              "The index of the submission that was used to calculate this result",
            ];
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 6];
            };
          },
          {
            name: "slot";
            docs: ["The slot at which this value was signed."];
            type: "u64";
          },
          {
            name: "minSlot";
            docs: [
              "The slot at which the first considered submission was made",
            ];
            type: "u64";
          },
          {
            name: "maxSlot";
            docs: ["The slot at which the last considered submission was made"];
            type: "u64";
          },
        ];
      };
    },
    {
      name: "garbageCollectionEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "guardianQuoteVerifyEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "quote";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "guardianQuoteVerifyParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "reserved1";
            type: "u32";
          },
          {
            name: "ed25519Key";
            type: "pubkey";
          },
          {
            name: "secp256k1Key";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "signature";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "recoveryId";
            type: "u8";
          },
          {
            name: "advisories";
            type: {
              vec: "u32";
            };
          },
        ];
      };
    },
    {
      name: "guardianRegisterParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "guardianUnregisterParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "megaSlotInfo";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "reserved1";
            type: "u64";
          },
          {
            name: "slotEnd";
            type: "u64";
          },
          {
            name: "perfGoal";
            type: "i64";
          },
          {
            name: "currentSignatureCount";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "multiSubmission";
      type: {
        kind: "struct";
        fields: [
          {
            name: "values";
            type: {
              vec: "i128";
            };
          },
          {
            name: "signature";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "recoveryId";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "oracleAccountData";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "enclave";
            docs: ["Represents the state of the quote verifiers enclave."];
            type: {
              defined: {
                name: "quote";
              };
            };
          },
          {
            name: "authority";
            docs: [
              "The authority of the EnclaveAccount which is permitted to make account changes.",
            ];
            type: "pubkey";
          },
          {
            name: "queue";
            docs: [
              "Queue used for attestation to verify a MRENCLAVE measurement.",
            ];
            type: "pubkey";
          },
          {
            name: "createdAt";
            docs: ["The unix timestamp when the quote was created."];
            type: "i64";
          },
          {
            name: "lastHeartbeat";
            docs: ["The last time the quote heartbeated on-chain."];
            type: "i64";
          },
          {
            name: "secpAuthority";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "gatewayUri";
            docs: ["URI location of the verifier's gateway."];
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "permissions";
            type: "u64";
          },
          {
            name: "isOnQueue";
            docs: [
              "Whether the quote is located on the AttestationQueues buffer.",
            ];
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "lutSlot";
            type: "u64";
          },
          {
            name: "lastRewardEpoch";
            type: "u64";
          },
          {
            name: "operator";
            type: "pubkey";
          },
          {
            name: "ebuf3";
            type: {
              array: ["u8", 16];
            };
          },
          {
            name: "ebuf2";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "ebuf1";
            type: {
              array: ["u8", 1024];
            };
          },
        ];
      };
    },
    {
      name: "oracleEpochInfo";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "reserved1";
            type: "u64";
          },
          {
            name: "reserved";
            type: "u64";
          },
          {
            name: "slashScore";
            type: "u64";
          },
          {
            name: "rewardScore";
            type: "u64";
          },
          {
            name: "stakeScore";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "oracleHeartbeatEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleHeartbeatParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gatewayUri";
            type: {
              option: {
                array: ["u8", 64];
              };
            };
          },
        ];
      };
    },
    {
      name: "oracleHeartbeatV2Params";
      type: {
        kind: "struct";
        fields: [
          {
            name: "gatewayUri";
            type: {
              option: {
                array: ["u8", 64];
              };
            };
          },
        ];
      };
    },
    {
      name: "oracleInitEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleInitParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recentSlot";
            type: "u64";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "secpAuthority";
            type: {
              option: {
                array: ["u8", 64];
              };
            };
          },
        ];
      };
    },
    {
      name: "oracleInitSvmParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recentSlot";
            type: "u64";
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "secpAuthority";
            type: {
              option: {
                array: ["u8", 64];
              };
            };
          },
          {
            name: "sourceOracleKey";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleQuoteOverrideEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleQuoteRotateEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleQuoteVerifyRequestEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "quote";
            type: "pubkey";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "oracleResetLutParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recentSlot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "oracleSetConfigsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newAuthority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "newSecpAuthority";
            type: {
              option: {
                array: ["u8", 64];
              };
            };
          },
        ];
      };
    },
    {
      name: "oracleSetOperatorParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "oracleStatsAccountData";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "finalizedEpoch";
            docs: [
              "The last epoch that has completed. cleared after registered with the",
              "staking program.",
            ];
            type: {
              defined: {
                name: "oracleEpochInfo";
              };
            };
          },
          {
            name: "currentEpoch";
            docs: [
              "The current epoch info being used by the oracle. for stake. Will moved",
              "to finalized_epoch as soon as the epoch is over.",
            ];
            type: {
              defined: {
                name: "oracleEpochInfo";
              };
            };
          },
          {
            name: "megaSlotInfo";
            type: {
              defined: {
                name: "megaSlotInfo";
              };
            };
          },
          {
            name: "lastTransferSlot";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "ebuf";
            docs: ["Reserved."];
            type: {
              array: ["u8", 1024];
            };
          },
        ];
      };
    },
    {
      name: "oracleSubmission";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "oracle";
            docs: ["The public key of the oracle that submitted this value."];
            type: "pubkey";
          },
          {
            name: "slot";
            docs: ["The slot at which this value was signed."];
            type: "u64";
          },
          {
            name: "landedAt";
            docs: ["The slot at which this value was landed on chain."];
            type: "u64";
          },
          {
            name: "value";
            docs: ["The value that was submitted."];
            type: "i128";
          },
        ];
      };
    },
    {
      name: "oracleSyncLutParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "permissionSetEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "permission";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "permissionSetParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "permission";
            type: "u8";
          },
          {
            name: "enable";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "pullFeedAccountData";
      docs: ["A representation of the data in a pull feed account."];
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "submissions";
            docs: ["The oracle submissions for this feed."];
            type: {
              array: [
                {
                  defined: {
                    name: "oracleSubmission";
                  };
                },
                32,
              ];
            };
          },
          {
            name: "authority";
            docs: [
              "The public key of the authority that can update the feed hash that",
              "this account will use for registering updates.",
            ];
            type: "pubkey";
          },
          {
            name: "queue";
            docs: [
              "The public key of the queue which oracles must be bound to in order to",
              "submit data to this feed.",
            ];
            type: "pubkey";
          },
          {
            name: "feedHash";
            docs: [
              "SHA-256 hash of the job schema oracles will execute to produce data",
              "for this feed.",
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "initializedAt";
            docs: ["The slot at which this account was initialized."];
            type: "i64";
          },
          {
            name: "permissions";
            type: "u64";
          },
          {
            name: "maxVariance";
            type: "u64";
          },
          {
            name: "minResponses";
            type: "u32";
          },
          {
            name: "name";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 1];
            };
          },
          {
            name: "permitWriteByAuthority";
            type: "u8";
          },
          {
            name: "historicalResultIdx";
            type: "u8";
          },
          {
            name: "minSampleSize";
            type: "u8";
          },
          {
            name: "lastUpdateTimestamp";
            type: "i64";
          },
          {
            name: "lutSlot";
            type: "u64";
          },
          {
            name: "reserved1";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "result";
            type: {
              defined: {
                name: "currentResult";
              };
            };
          },
          {
            name: "maxStaleness";
            type: "u32";
          },
          {
            name: "padding2";
            type: {
              array: ["u8", 12];
            };
          },
          {
            name: "historicalResults";
            type: {
              array: [
                {
                  defined: {
                    name: "compactResult";
                  };
                },
                32,
              ];
            };
          },
          {
            name: "ebuf4";
            type: {
              array: ["u8", 8];
            };
          },
          {
            name: "ebuf3";
            type: {
              array: ["u8", 24];
            };
          },
          {
            name: "submissionTimestamps";
            type: {
              array: ["i64", 32];
            };
          },
        ];
      };
    },
    {
      name: "pullFeedCloseParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "pullFeedErrorValueEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feed";
            type: "pubkey";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "pullFeedInitParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "maxVariance";
            type: "u64";
          },
          {
            name: "minResponses";
            type: "u32";
          },
          {
            name: "name";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "recentSlot";
            type: "u64";
          },
          {
            name: "ipfsHash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "minSampleSize";
            type: "u8";
          },
          {
            name: "maxStaleness";
            type: "u32";
          },
          {
            name: "permitWriteByAuthority";
            type: {
              option: "bool";
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSetConfigsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedHash";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "authority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "maxVariance";
            type: {
              option: "u64";
            };
          },
          {
            name: "minResponses";
            type: {
              option: "u32";
            };
          },
          {
            name: "name";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "ipfsHash";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "minSampleSize";
            type: {
              option: "u8";
            };
          },
          {
            name: "maxStaleness";
            type: {
              option: "u32";
            };
          },
          {
            name: "permitWriteByAuthority";
            type: {
              option: "bool";
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSubmitResponseConsensusLightParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "values";
            type: {
              vec: "i128";
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSubmitResponseConsensusParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "values";
            type: {
              vec: "i128";
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSubmitResponseManyParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "submissions";
            type: {
              vec: {
                defined: {
                  name: "multiSubmission";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSubmitResponseParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "submissions";
            type: {
              vec: {
                defined: {
                  name: "sb_on_demand::actions::pull_feed::pull_feed_submit_response_action::Submission";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "pullFeedSubmitResponseSvmParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "submissions";
            type: {
              vec: {
                defined: {
                  name: "sb_on_demand::actions::pull_feed::pull_feed_submit_response_svm_action::Submission";
                };
              };
            };
          },
          {
            name: "sourceQueueKey";
            type: "pubkey";
          },
          {
            name: "queueBump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "pullFeedValueEvents";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feeds";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "oracles";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "values";
            type: {
              vec: {
                vec: "i128";
              };
            };
          },
          {
            name: "reward";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "queueAccountData";
      docs: [
        "An Queue represents a round-robin queue of oracle oracles who attest on-chain",
        "whether a Switchboard Function was executed within an enclave against an expected set of",
        "enclave measurements.",
        "",
        "For an oracle to join the queue, the oracle must first submit their enclave quote on-chain and",
        "wait for an existing oracle to attest their quote. If the oracle's quote matches an expected",
        "measurement within the queues mr_enclaves config, it is granted permissions and will start",
        "being assigned update requests.",
      ];
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            docs: [
              "The address of the authority which is permitted to add/remove allowed enclave measurements.",
            ];
            type: "pubkey";
          },
          {
            name: "mrEnclaves";
            docs: ["Allowed enclave measurements."];
            type: {
              array: [
                {
                  array: ["u8", 32];
                },
                32,
              ];
            };
          },
          {
            name: "oracleKeys";
            docs: [
              "The addresses of the quote oracles who have a valid",
              "verification status and have heartbeated on-chain recently.",
            ];
            type: {
              array: ["pubkey", 128];
            };
          },
          {
            name: "maxQuoteVerificationAge";
            docs: [
              "The maximum allowable time until a EnclaveAccount needs to be re-verified on-chain.",
            ];
            type: "i64";
          },
          {
            name: "lastHeartbeat";
            docs: [
              "The unix timestamp when the last quote oracle heartbeated on-chain.",
            ];
            type: "i64";
          },
          {
            name: "nodeTimeout";
            type: "i64";
          },
          {
            name: "oracleMinStake";
            docs: [
              "The minimum number of lamports a quote oracle needs to lock-up in order to heartbeat and verify other quotes.",
            ];
            type: "u64";
          },
          {
            name: "allowAuthorityOverrideAfter";
            type: "i64";
          },
          {
            name: "mrEnclavesLen";
            docs: ["The number of allowed enclave measurements."];
            type: "u32";
          },
          {
            name: "oracleKeysLen";
            docs: [
              "The length of valid quote oracles for the given attestation queue.",
            ];
            type: "u32";
          },
          {
            name: "reward";
            docs: ["The reward paid to quote oracles for attesting on-chain."];
            type: "u32";
          },
          {
            name: "currIdx";
            docs: [
              "Incrementer used to track the current quote oracle permitted to run any available functions.",
            ];
            type: "u32";
          },
          {
            name: "gcIdx";
            docs: [
              "Incrementer used to garbage collect and remove stale quote oracles.",
            ];
            type: "u32";
          },
          {
            name: "requireAuthorityHeartbeatPermission";
            type: "u8";
          },
          {
            name: "requireAuthorityVerifyPermission";
            type: "u8";
          },
          {
            name: "requireUsagePermissions";
            type: "u8";
          },
          {
            name: "signerBump";
            type: "u8";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "lutSlot";
            type: "u64";
          },
          {
            name: "allowSubsidies";
            type: "u8";
          },
          {
            name: "ebuf6";
            type: {
              array: ["u8", 15];
            };
          },
          {
            name: "ncn";
            type: "pubkey";
          },
          {
            name: "resrved";
            type: "u64";
          },
          {
            name: "vaults";
            type: {
              array: [
                {
                  defined: {
                    name: "vaultInfo";
                  };
                },
                4,
              ];
            };
          },
          {
            name: "lastRewardEpoch";
            type: "u64";
          },
          {
            name: "ebuf4";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "ebuf2";
            type: {
              array: ["u8", 256];
            };
          },
          {
            name: "ebuf1";
            type: {
              array: ["u8", 504];
            };
          },
        ];
      };
    },
    {
      name: "queueAddMrEnclaveEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "queueAddMrEnclaveParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "queueAllowSubsidiesParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "allowSubsidies";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "queueGarbageCollectParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "idx";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "queueInitEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "queue";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "queueInitParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "allowAuthorityOverrideAfter";
            type: "u32";
          },
          {
            name: "requireAuthorityHeartbeatPermission";
            type: "bool";
          },
          {
            name: "requireUsagePermissions";
            type: "bool";
          },
          {
            name: "maxQuoteVerificationAge";
            type: "u32";
          },
          {
            name: "reward";
            type: "u32";
          },
          {
            name: "nodeTimeout";
            type: "u32";
          },
          {
            name: "recentSlot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "queueInitSvmParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "allowAuthorityOverrideAfter";
            type: "u32";
          },
          {
            name: "requireAuthorityHeartbeatPermission";
            type: "bool";
          },
          {
            name: "requireUsagePermissions";
            type: "bool";
          },
          {
            name: "maxQuoteVerificationAge";
            type: "u32";
          },
          {
            name: "reward";
            type: "u32";
          },
          {
            name: "nodeTimeout";
            type: "u32";
          },
          {
            name: "recentSlot";
            type: "u64";
          },
          {
            name: "sourceQueueKey";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "queueOverrideSvmParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "secp256k1Signer";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "maxQuoteVerificationAge";
            type: "i64";
          },
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "slot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "queuePayRewardsParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "queuePaySubsidyParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "queueRemoveMrEnclaveEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "queueRemoveMrEnclaveParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "mrEnclave";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "queueResetLutParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recentSlot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "queueResetVaultParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "queueSetConfigsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "reward";
            type: {
              option: "u32";
            };
          },
          {
            name: "nodeTimeout";
            type: {
              option: "i64";
            };
          },
        ];
      };
    },
    {
      name: "queueSetNcnParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "queueSetVaultParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "enable";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "quote";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "enclaveSigner";
            docs: ["The address of the signer generated within an enclave."];
            type: "pubkey";
          },
          {
            name: "mrEnclave";
            docs: [
              "The quotes MRENCLAVE measurement dictating the contents of the secure enclave.",
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "verificationStatus";
            docs: ["The VerificationStatus of the quote."];
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "verificationTimestamp";
            docs: ["The unix timestamp when the quote was last verified."];
            type: "i64";
          },
          {
            name: "validUntil";
            docs: [
              "The unix timestamp when the quotes verification status expires.",
            ];
            type: "i64";
          },
          {
            name: "quoteRegistry";
            docs: [
              "The off-chain registry where the verifiers quote can be located.",
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "registryKey";
            docs: [
              "Key to lookup the buffer data on IPFS or an alternative decentralized storage solution.",
            ];
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "secp256k1Signer";
            docs: [
              "The secp256k1 public key of the enclave signer. Derived from the enclave_signer.",
            ];
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "lastEd25519Signer";
            type: "pubkey";
          },
          {
            name: "lastSecp256k1Signer";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "lastRotateSlot";
            type: "u64";
          },
          {
            name: "guardianApprovers";
            type: {
              array: ["pubkey", 64];
            };
          },
          {
            name: "guardianApproversLen";
            type: "u8";
          },
          {
            name: "padding2";
            type: {
              array: ["u8", 7];
            };
          },
          {
            name: "stagingEd25519Signer";
            type: "pubkey";
          },
          {
            name: "stagingSecp256k1Signer";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "ethSigner";
            type: {
              array: ["u8", 20];
            };
          },
          {
            name: "ebuf4";
            docs: ["Reserved."];
            type: {
              array: ["u8", 12];
            };
          },
          {
            name: "ebuf3";
            type: {
              array: ["u8", 128];
            };
          },
          {
            name: "ebuf2";
            type: {
              array: ["u8", 256];
            };
          },
          {
            name: "ebuf1";
            type: {
              array: ["u8", 512];
            };
          },
        ];
      };
    },
    {
      name: "randomnessAccountData";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "queue";
            type: "pubkey";
          },
          {
            name: "seedSlothash";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "seedSlot";
            type: "u64";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "revealSlot";
            type: "u64";
          },
          {
            name: "value";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "lutSlot";
            type: "u64";
          },
          {
            name: "ebuf3";
            type: {
              array: ["u8", 24];
            };
          },
          {
            name: "ebuf2";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "ebuf1";
            type: {
              array: ["u8", 128];
            };
          },
          {
            name: "activeSecp256k1Signer";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "activeSecp256k1Expiration";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "randomnessCommitEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "randomnessAccount";
            type: "pubkey";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "slot";
            type: "u64";
          },
          {
            name: "slothash";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "randomnessCommitParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "randomnessInitParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "recentSlot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "randomnessRevealParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "signature";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "recoveryId";
            type: "u8";
          },
          {
            name: "value";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "state";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "testOnlyDisableMrEnclaveCheck";
            type: "u8";
          },
          {
            name: "enableStaking";
            type: "u8";
          },
          {
            name: "padding1";
            type: {
              array: ["u8", 5];
            };
          },
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "guardianQueue";
            type: "pubkey";
          },
          {
            name: "reserved1";
            type: "u64";
          },
          {
            name: "epochLength";
            type: "u64";
          },
          {
            name: "reserved2";
            type: {
              array: ["u8", 136];
            };
          },
          {
            name: "switchMint";
            type: "pubkey";
          },
          {
            name: "sgxAdvisories";
            type: {
              array: ["u16", 32];
            };
          },
          {
            name: "advisoriesLen";
            type: "u8";
          },
          {
            name: "padding2";
            type: "u8";
          },
          {
            name: "flatRewardCutPercentage";
            type: "u8";
          },
          {
            name: "enableSlashing";
            type: "u8";
          },
          {
            name: "padding3";
            type: "u32";
          },
          {
            name: "lutSlot";
            type: "u64";
          },
          {
            name: "baseReward";
            type: "u32";
          },
          {
            name: "padding4";
            type: {
              array: ["u8", 4];
            };
          },
          {
            name: "subsidyAmount";
            type: "u64";
          },
          {
            name: "ebuf6";
            type: {
              array: ["u8", 16];
            };
          },
          {
            name: "ebuf5";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "ebuf4";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "ebuf3";
            type: {
              array: ["u8", 128];
            };
          },
          {
            name: "ebuf2";
            type: {
              array: ["u8", 512];
            };
          },
          {
            name: "costWhitelist";
            docs: ["Cost whitelist by authority"];
            type: {
              array: ["pubkey", 32];
            };
          },
        ];
      };
    },
    {
      name: "stateInitParams";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "stateSetConfigsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newAuthority";
            type: "pubkey";
          },
          {
            name: "testOnlyDisableMrEnclaveCheck";
            type: "u8";
          },
          {
            name: "addAdvisory";
            type: "u16";
          },
          {
            name: "rmAdvisory";
            type: "u16";
          },
          {
            name: "switchMint";
            type: "pubkey";
          },
          {
            name: "subsidyAmount";
            type: "u64";
          },
          {
            name: "baseReward";
            type: "u32";
          },
          {
            name: "addCostWl";
            type: "pubkey";
          },
          {
            name: "rmCostWl";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "testUpdateOracleStatsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newRewardScore";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "vaultInfo";
      serialization: "bytemuck";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultKey";
            type: "pubkey";
          },
          {
            name: "lastRewardEpoch";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "sb_on_demand::actions::pull_feed::pull_feed_submit_response_action::Submission";
      type: {
        kind: "struct";
        fields: [
          {
            name: "value";
            type: "i128";
          },
          {
            name: "signature";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "recoveryId";
            type: "u8";
          },
          {
            name: "offset";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "sb_on_demand::actions::pull_feed::pull_feed_submit_response_svm_action::Submission";
      type: {
        kind: "struct";
        fields: [
          {
            name: "value";
            type: "i128";
          },
          {
            name: "signature";
            type: {
              array: ["u8", 64];
            };
          },
          {
            name: "recoveryId";
            type: "u8";
          },
        ];
      };
    },
  ];
};
