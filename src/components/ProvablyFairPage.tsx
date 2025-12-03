import { Shield, Lock, Check, Copy, RefreshCw, Eye, Calculator, FileCheck, ChevronRight, Info } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion } from "motion/react";

export function ProvablyFairPage() {
  const [serverSeed, setServerSeed] = useState("a4f8e2d9c1b6...");
  const [clientSeed, setClientSeed] = useState("user_generated_seed_12345");
  const [nonce, setNonce] = useState(1);
  const [result, setResult] = useState<number | null>(null);

  const handleVerify = () => {
    // Simulate verification
    const mockResult = Math.floor(Math.random() * 100);
    setResult(mockResult);
  };

  const handleGenerateNewSeed = () => {
    const randomSeed = 'user_' + Math.random().toString(36).substring(2, 15);
    setClientSeed(randomSeed);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lootbox-card relative overflow-hidden border-2" 
        style={{ 
          borderColor: 'var(--lootbox-green)',
          background: 'linear-gradient(135deg, var(--lootbox-bg-secondary), var(--lootbox-bg-tertiary))'
        }}
      >
        <div className="absolute inset-0 lootbox-grid-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ 
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
        }} />
        <div className="relative p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center border-4" style={{ 
              background: 'linear-gradient(135deg, #10B981, #059669)',
              borderColor: 'rgba(16, 185, 129, 0.3)'
            }}>
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="px-4 py-1.5 rounded-full border-2 flex items-center gap-2" style={{ 
                  borderColor: 'var(--lootbox-green)',
                  background: 'rgba(16, 185, 129, 0.1)'
                }}>
                  <Check className="w-4 h-4" style={{ color: 'var(--lootbox-green)' }} />
                  <span style={{ color: 'var(--lootbox-green)', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    VERIFIED SYSTEM
                  </span>
                </div>
              </div>
              <h1 className="text-white mb-3" style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
                Provably Fair
              </h1>
              <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '1.125rem', maxWidth: '800px' }}>
                Our provably fair system uses cryptographic algorithms to ensure that every case opening is completely random, transparent, and verifiable. You can independently verify the fairness of each result.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-8 border-2 hover:border-blue-500 transition-all" 
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border-2" style={{ 
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            borderColor: 'rgba(59, 130, 246, 0.3)'
          }}>
            <Lock className="w-7 h-7 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ 
              background: 'var(--lootbox-blue-primary)',
              fontWeight: 900
            }}>
              1
            </div>
            <h3 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Server Seed
            </h3>
          </div>
          <p style={{ color: 'var(--lootbox-text-secondary)', lineHeight: 1.6 }}>
            We generate a random server seed before each game. This seed is hashed and shown to you before the game starts, ensuring we can't change it later.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-8 border-2 hover:border-purple-500 transition-all" 
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border-2" style={{ 
            background: 'linear-gradient(135deg, #A855F7, #9333EA)',
            borderColor: 'rgba(168, 85, 247, 0.3)'
          }}>
            <Eye className="w-7 h-7 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ 
              background: '#A855F7',
              fontWeight: 900
            }}>
              2
            </div>
            <h3 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Client Seed
            </h3>
          </div>
          <p style={{ color: 'var(--lootbox-text-secondary)', lineHeight: 1.6 }}>
            You provide your own client seed (or use our random generator). This ensures that you have control over part of the randomization process.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="lootbox-card p-8 border-2 hover:border-green-500 transition-all" 
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border-2" style={{ 
            background: 'linear-gradient(135deg, #10B981, #059669)',
            borderColor: 'rgba(16, 185, 129, 0.3)'
          }}>
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ 
              background: 'var(--lootbox-green)',
              fontWeight: 900
            }}>
              3
            </div>
            <h3 className="text-white" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Verification
            </h3>
          </div>
          <p style={{ color: 'var(--lootbox-text-secondary)', lineHeight: 1.6 }}>
            After the game, we reveal the server seed. You can use both seeds and the nonce to independently verify that the result was fair and random.
          </p>
        </motion.div>
      </div>

      {/* Verification Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Input Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lootbox-card p-8 border-2" 
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <FileCheck className="w-6 h-6" style={{ color: 'var(--lootbox-blue-primary)' }} />
            <h2 className="text-white" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Verify Results
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Server Seed */}
            <div>
              <label className="block mb-2" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                Server Seed (Hashed)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={serverSeed}
                  onChange={(e) => setServerSeed(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border outline-none text-white transition-all focus:border-opacity-100"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                  placeholder="Enter server seed hash..."
                />
                <Button
                  onClick={() => copyToClipboard(serverSeed)}
                  variant="outline"
                  className="border"
                  style={{ borderColor: 'var(--lootbox-border)' }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Client Seed */}
            <div>
              <label className="block mb-2" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                Client Seed
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={clientSeed}
                  onChange={(e) => setClientSeed(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border outline-none text-white transition-all focus:border-opacity-100"
                  style={{ 
                    background: 'var(--lootbox-bg-secondary)',
                    borderColor: 'var(--lootbox-border)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem'
                  }}
                  placeholder="Enter your client seed..."
                />
                <Button
                  onClick={handleGenerateNewSeed}
                  variant="outline"
                  className="border"
                  style={{ borderColor: 'var(--lootbox-border)' }}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Nonce */}
            <div>
              <label className="block mb-2" style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                Nonce
              </label>
              <input
                type="number"
                value={nonce}
                onChange={(e) => setNonce(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-lg border outline-none text-white transition-all focus:border-opacity-100"
                style={{ 
                  background: 'var(--lootbox-bg-secondary)',
                  borderColor: 'var(--lootbox-border)',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
                placeholder="Enter nonce..."
              />
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              className="w-full lootbox-gradient-blue"
              style={{ fontWeight: 700, fontSize: '1rem', padding: '1.25rem' }}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Verify Result
            </Button>
          </div>
        </motion.div>

        {/* Right - Result Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lootbox-card p-8 border-2" 
          style={{ borderColor: 'var(--lootbox-border)' }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Check className="w-6 h-6" style={{ color: 'var(--lootbox-green)' }} />
            <h2 className="text-white" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Verification Result
            </h2>
          </div>

          {result !== null ? (
            <div className="space-y-6">
              {/* Result Display */}
              <div className="p-6 rounded-xl border-2 text-center" style={{ 
                background: 'var(--lootbox-bg-secondary)',
                borderColor: 'var(--lootbox-green)'
              }}>
                <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '12px' }}>
                  Generated Result
                </div>
                <div className="text-white mb-4" style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1 }}>
                  {result}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border" style={{ 
                  borderColor: 'var(--lootbox-green)',
                  background: 'rgba(16, 185, 129, 0.1)'
                }}>
                  <Check className="w-4 h-4" style={{ color: 'var(--lootbox-green)' }} />
                  <span style={{ color: 'var(--lootbox-green)', fontSize: '0.875rem', fontWeight: 700 }}>
                    VERIFIED FAIR
                  </span>
                </div>
              </div>

              {/* Verification Details */}
              <div className="space-y-3">
                <div className="p-4 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                      Hash Algorithm
                    </span>
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      SHA-256
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                      Verification Status
                    </span>
                    <span style={{ color: 'var(--lootbox-green)', fontWeight: 700 }}>
                      ✓ Valid
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border" style={{ background: 'var(--lootbox-bg-tertiary)', borderColor: 'var(--lootbox-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                      Timestamp
                    </span>
                    <span className="text-white" style={{ fontWeight: 700 }}>
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Notice */}
              <div className="flex gap-3 p-4 rounded-lg border" style={{ 
                background: 'rgba(59, 130, 246, 0.05)',
                borderColor: 'var(--lootbox-blue-primary)'
              }}>
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--lootbox-blue-primary)' }} />
                <p style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  This result has been cryptographically verified using the provided seeds. You can independently verify this using any SHA-256 calculator.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'var(--lootbox-bg-tertiary)' }}>
                <Calculator className="w-10 h-10" style={{ color: 'var(--lootbox-text-secondary)' }} />
              </div>
              <h3 className="text-white mb-2" style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                No Results Yet
              </h3>
              <p style={{ color: 'var(--lootbox-text-secondary)', textAlign: 'center', maxWidth: '300px' }}>
                Enter your seeds and click "Verify Result" to check the fairness of any game result.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="lootbox-card p-8 border-2" style={{ borderColor: 'var(--lootbox-border)' }}>
        <h2 className="text-white mb-6" style={{ fontSize: '2rem', fontWeight: 800 }}>
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {[
            {
              question: "What is Provably Fair?",
              answer: "Provably Fair is a cryptographic algorithm that guarantees complete randomness and transparency. It allows you to verify that each result was genuinely random and not manipulated by us or anyone else."
            },
            {
              question: "How do I verify my results?",
              answer: "After each game, you can use the server seed (which we reveal after the game), your client seed, and the nonce to independently calculate and verify the result using the verification tool above."
            },
            {
              question: "Can BOOF-LOCKER manipulate the results?",
              answer: "No. The server seed is hashed and shown to you before the game starts. Since we can't change it after showing you the hash, we have no way to manipulate the outcome."
            },
            {
              question: "What is a client seed?",
              answer: "A client seed is a random string that you provide to influence the randomization. You can change it anytime to ensure that you have control over part of the process."
            },
            {
              question: "What is a nonce?",
              answer: "A nonce (number used once) is a counter that increments with each bet. It ensures that each result is unique, even if the same seeds are used multiple times."
            }
          ].map((faq, index) => (
            <div key={index} className="p-6 rounded-lg border hover:border-blue-500 transition-all" style={{ 
              background: 'var(--lootbox-bg-secondary)',
              borderColor: 'var(--lootbox-border)'
            }}>
              <div className="flex items-start gap-4">
                <ChevronRight className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--lootbox-blue-primary)' }} />
                <div className="flex-1">
                  <h3 className="text-white mb-2" style={{ fontSize: '1.125rem', fontWeight: 700 }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: 'var(--lootbox-text-secondary)', lineHeight: 1.6 }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="lootbox-card p-6 text-center border-2" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
            background: 'linear-gradient(135deg, #10B981, #059669)'
          }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="text-white mb-2" style={{ fontSize: '2rem', fontWeight: 900 }}>
            100%
          </div>
          <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
            Transparent & Verifiable
          </div>
        </div>

        <div className="lootbox-card p-6 text-center border-2" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
            background: 'linear-gradient(135deg, #3B82F6, #2563EB)'
          }}>
            <Lock className="w-8 h-8 text-white" />
          </div>
          <div className="text-white mb-2" style={{ fontSize: '2rem', fontWeight: 900 }}>
            SHA-256
          </div>
          <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
            Military-Grade Encryption
          </div>
        </div>

        <div className="lootbox-card p-6 text-center border-2" style={{ borderColor: 'var(--lootbox-border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
            background: 'linear-gradient(135deg, #A855F7, #9333EA)'
          }}>
            <Check className="w-8 h-8 text-white" />
          </div>
          <div className="text-white mb-2" style={{ fontSize: '2rem', fontWeight: 900 }}>
            2.4M+
          </div>
          <div style={{ color: 'var(--lootbox-text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
            Verified Games
          </div>
        </div>
      </div>
    </div>
  );
}
