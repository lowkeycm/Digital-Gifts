import { Nav } from "@/components/Nav";
import { IntakeForm } from "@/components/IntakeForm";

export default function CreatePage() {
  return <><Nav/><main className="shell create-layout"><aside className="create-aside"><span className="eyebrow">Your raw story is the ingredient</span><h2>Do not try to sound like a songwriter.</h2><p>Give us the facts, weird little details and real memories. The music model can do the songwriting. It cannot know what you never told it.</p><div className="aside-note"><strong>Good detail</strong><p>“Every time we road-trip, she falls asleep before we leave the city and wakes up asking if we are there yet.”</p></div></aside><div className="form-wrap"><IntakeForm/></div></main></>;
}
