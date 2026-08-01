const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const howItWorksHtml = 
    <!-- How It Works Section -->
    <section id="how-it-works" class="section">
        <div class="container">
            <span class="section-badge">Process</span>
            <h2 class="section-title">How It <em>Works</em>.</h2>
            <p class="section-subtitle">Our streamlined approach to delivering excellence</p>

            <div class="how-it-works-grid" id="how-it-works-grid">
                <!-- Step 1 -->
                <div role="listitem" class="voices_item fade-in-stagger visible" style="top: 15vh;">
                    <div class="card-wrapper">
                        <div class="voices_slide-wrapper">
                            <div class="voices_top">
                                <div class="voices_photo">1</div>
                                <div class="voices_flex">
                                    <div class="voices_position">Phase 1</div>
                                    <div>Discovery & Strategy</div>
                                </div>
                            </div>
                            <div class="voices_bottom">
                                <div class="voices_quote">"We dive deep into your brand, target audience, and business goals to formulate a comprehensive strategic roadmap that guarantees results."</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div role="listitem" class="voices_item fade-in-stagger visible" style="top: 18vh;">
                    <div class="card-wrapper">
                        <div class="voices_slide-wrapper">
                            <div class="voices_top">
                                <div class="voices_photo">2</div>
                                <div class="voices_flex">
                                    <div class="voices_position">Phase 2</div>
                                    <div>Design & Prototyping</div>
                                </div>
                            </div>
                            <div class="voices_bottom">
                                <div class="voices_quote">"Our creative team crafts stunning, conversion-optimized designs, allowing you to visualize and refine the user experience before development begins."</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div role="listitem" class="voices_item fade-in-stagger visible" style="top: 21vh;">
                    <div class="card-wrapper">
                        <div class="voices_slide-wrapper">
                            <div class="voices_top">
                                <div class="voices_photo">3</div>
                                <div class="voices_flex">
                                    <div class="voices_position">Phase 3</div>
                                    <div>Development & Launch</div>
                                </div>
                            </div>
                            <div class="voices_bottom">
                                <div class="voices_quote">"We bring your vision to life using cutting-edge technologies, ensuring a flawless, high-performance launch that captivates your audience instantly."</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
;

html = html.replace('    <!-- Our Work Section -->', howItWorksHtml + '\n    <!-- Our Work Section -->');
fs.writeFileSync('index.html', html);
