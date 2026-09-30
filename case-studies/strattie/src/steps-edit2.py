import html, re
import os; d=os.path.dirname(os.path.abspath(__file__))+'/'
s=open(d+'sections.html').read()
def xp(img, alt, points):
    pins=''.join(f'<button type="button" class="xp-pin" data-i="{i}" style="--px:{p["pin"][0]}%;--py:{p["pin"][1]}%;--k:{i}" aria-label="{i+1}: {html.escape(p["t"])}" tabindex="-1">{i+1}</button>' for i,p in enumerate(points))
    items=''.join(f'<li><button type="button" class="xp-item" data-i="{i}" aria-pressed="false" data-r="{",".join(str(v) for v in p["r"])}"><span class="n">{i+1}</span><span class="tx"><b>{p["t"]}</b> {p["d"]}</span></button></li>' for i,p in enumerate(points))
    return (f'<div class="xp" data-xp>'
            f'<div class="xp-media framed"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:1.5385"><img src="{img}" width="2000" height="1300" loading="lazy" alt="{html.escape(alt)}"></div>'
            f'<div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{pins}</div></div>'
            f'<button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div>'
            f'<div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{items}</ol>'
            f'<button type="button" class="xp-reset" hidden>Show the full design</button></div></div>')

q1_points=[dict(t='In the corner, not a pop-up.',d='The page stays usable behind it, and it stays out of the way until you need it.',r=(64.9,26.8,33.9,71.0),pin=(65.3,27.8)),
  dict(t='"Under a minute".',d='Says how long it takes up front, so starting feels safe.',r=(66.0,44.0,10.2,3.4),pin=(77.9,45.8)),
  dict(t='Everyday words, not method names.',d='People pick what they want to do, not which tool to use.',r=(65.7,52.1,31.8,36.6),pin=(64.5,53.4)),
  dict(t='"Something else".',d="Anything that doesn't fit, in their own words.",r=(65.7,89.4,31.8,6.8),pin=(64.5,92.5))]
q2_points=[dict(t='Your answer, kept short.',d='Once picked, it shrinks to a short message, so the panel stays easy to read.',r=(84.4,36.4,13.2,5.1),pin=(83.3,39.0)),
  dict(t='Goals, still in plain language.',d="Question two narrows the problem to what you want to achieve, like mapping or assessing your business model.",r=(65.7,47.4,31.8,44.2),pin=(64.5,48.7)),
  dict(t='The panel stays the same size.',d='When there are more options than fit, the list scrolls inside it.',r=(97.9,63.8,0.8,9.0),pin=(96.4,68.4)),
  dict(t='"Something else", at every step.',d='There is always a way out in your own words.',r=(65.7,92.1,31.8,5.8),pin=(64.5,94.8))]
q3_points=[dict(t='Your answers stay in view.',d='Each pick stays as a short message you can go back and edit.',r=(75.2,36.4,22.3,11.2),pin=(74.9,38.3)),
  dict(t='Only asked when it matters.',d='"Where are you now?" appears only where it changes the recommendation.',r=(65.7,49.6,31.8,27.6),pin=(64.5,51.0)),
  dict(t='About progress, not expertise.',d='The options describe work you have already done, so people further along can skip ahead.',r=(65.7,55.2,31.8,21.8),pin=(64.5,57.3)),
  dict(t="The panel doesn't shrink.",d='Fewer options leave space at the bottom instead.',r=(65.7,77.6,31.8,18.8),pin=(64.5,79.2))]
rec_points=[dict(t='One clear first step.',d='A single best fit, so nobody has to choose between equals.',r=(65.7,60.3,31.8,18.6),pin=(64.5,61.6)),
  dict(t='You can switch at any point.',d='It is a place to start, not a commitment.',r=(66.2,56.0,28.4,3.0),pin=(95.8,57.5)),
  dict(t='Straight to the work.',d='One click takes you to the playbook.',r=(71.3,74.1,9.9,2.9),pin=(82.2,75.5)),
  dict(t='What else it considered.',d='Close alternatives are shown, not hidden, so the pick is easy to trust.',r=(65.7,80.5,31.8,17.4),pin=(64.5,81.7))]

panels=[
 ('Question 1',"The first question asks what you're working on, in everyday words.", xp('images/tab-62.webp',"The Recommender's first question, What are you working on?, docked over a Projects page: finding new ideas, understanding our customers, our value proposition, our business model, getting started with Strategyzer, or something else.",q1_points)),
 ('Question 2','Question two narrows the problem to a goal, still in plain language.', xp('images/tab-61.webp','The first answer, Our business model, collapsed into a message. Question two, What do you want to do?, lists goals such as mapping, assessing or improving the business model, with a scrollbar because the list runs past the fold.',q2_points)),
 ('Question 3','Question three, where are you now?, only appears where the answer changes the recommendation.', xp('images/tab-64.webp','Two answers shown as messages, then question three, Where are you now?, with three options: no canvas yet, I have a canvas, or I have a canvas and an assessment. Empty space sits below in the fixed-height panel.',q3_points)),
 ('Recommendation',"One best fit, the alternatives it considered, and one click to the playbook. What you'll need is shown up front, before you commit hours to it.", xp('images/tab-63.webp',"All three answers shown as messages, then Here's what I'd run first. You can switch at any point. A Best fit card for 10x your business model with a Go to playbook link, and an Also considered card below.",rec_points)),
]
TI=['',' tabindex="-1"']
a=s.index('<figure class="steps" data-steps>'); b=s.index('</figure>',a)+len('</figure>')
tabs=''.join(f'\n            <button type="button" role="tab" id="st-{i+1}" aria-controls="sp-{i+1}" aria-selected="{"true" if i==0 else "false"}"{TI[i>0]}>{t}</button>' for i,(t,c,_) in enumerate(panels))
ps=''.join(f'\n            <div class="step-panel{" on" if i==0 else ""}" role="tabpanel" id="sp-{i+1}" aria-labelledby="st-{i+1}" data-caption="{html.escape(c)}">{x}</div>' for i,(t,c,x) in enumerate(panels))
new=(f'<figure class="steps" data-steps>\n          <div class="step-tabs" role="tablist" aria-label="The Recommender, step by step">{tabs}\n          </div>\n          <div class="step-stage">{ps}\n          </div>\n'
     f'          <figcaption class="caption" aria-live="polite">{html.escape(panels[0][1])}</figcaption>\n        </figure>')
s=s[:a]+new+s[b:]
open(d+'sections.html','w').write(s)
print(s.count('data-xp'), s.count('role="tab"'))
