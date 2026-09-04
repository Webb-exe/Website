<script lang="ts">

  const promoCode = "FTC359";
  let copied = $state(false);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(promoCode);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
</script>

<section class="bg-dark relative section-wrapper pt-40 pb-16 sm:pt-52 sm:pb-24 overflow-hidden">
  <div class="section-content-narrow relative">
    <img src="/fabworks-logo.svg" alt="Fabworks" class="enter h-7 sm:h-8 w-auto" style="--i: 0" />
    <h1 class="enter display mt-8 text-5xl sm:text-7xl lg:text-8xl" style="--i: 1">
      5% off laser cutting <span class="text-pink">with Fabworks</span>
    </h1>
    <p class="enter mt-6 max-w-2xl text-lg leading-relaxed t-muted" style="--i: 2">
      Use our code at
      <a href="https://www.fabworks.com" target="_blank" rel="noopener noreferrer" class="link">fabworks.com</a>
      for 5% off your laser cutting order (up to $250). You save on fabrication and support 359 Webb.exe at the same time.
    </p>
  </div>
</section>

<section class="bg-dark relative section-wrapper py-20 sm:py-28">
  <div class="section-content-narrow grid gap-10 lg:grid-cols-12 lg:items-start">
    <!-- Coupon -->
    <div class="enter lg:col-span-5" style="--i: 3">
      <div class="relative rounded-2xl border-2 border-dashed border-ink/30 bg-white p-8 text-center text-ink shadow-[0_24px_50px_-24px_rgb(0_0_0/0.8)]" style="transform: rotate(-1.5deg)">
        <span class="label text-mauve!">Promo code</span>
        <p class="display mt-4 text-6xl tracking-wide">{promoCode}</p>
        <button onclick={copyCode} class="btn mt-6" aria-live="polite">
          {copied ? "Copied!" : "Copy code"}
        </button>
        <p class="mt-4 text-xs text-ink/50">5% off · up to $250 · laser cutting orders</p>
      </div>
    </div>

    <dl class="enter lg:col-span-7 flex flex-col gap-8 lg:pl-6" style="--i: 4">
      <div class="border-b border-dashed line pb-8">
        <dt class="display text-3xl">Does the team benefit?</dt>
        <dd class="mt-3 leading-relaxed t-muted">
          Yes. When you use our code, 359 Webb.exe receives a small kickback that helps fund our engineering and
          competition programs.
        </dd>
      </div>
      <div class="border-b border-dashed line pb-8">
        <dt class="display text-3xl">What is Fabworks?</dt>
        <dd class="mt-3 leading-relaxed t-muted">
          A U.S. laser cutting and manufacturing service for makers, engineers, and businesses, specializing in sheet
          metal and aluminum tubing with finishing options such as powder coating.
        </dd>
      </div>
      <a href="/sponsors" class="link self-start">Back to sponsors</a>
    </dl>
  </div>
</section>
