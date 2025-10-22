"""Tutorial step definitions and utilities."""

from typing import Dict, List
from .tutorial import TutorialStep


def get_tutorial_step(step_id: str) -> TutorialStep:
    """Get a specific tutorial step by ID."""
    return tutorial_steps.get(step_id)


def get_all_steps() -> List[TutorialStep]:
    """Get all tutorial steps in order."""
    steps_order = [
        'welcome',
        'learn_traits',
        'first_action',
        'karma_intro',
        'first_quest',
        'combat_intro',
        'guilds_intro',
        'marketplace_intro',
        'tutorial_complete'
    ]
    
    return [tutorial_steps[step_id] for step_id in steps_order]


def get_step_count() -> int:
    """Get total number of tutorial steps."""
    return len(tutorial_steps)


def validate_completion(step_id: str, player_data: Dict) -> bool:
    """Validate if a step's completion condition is met."""
    step = tutorial_steps.get(step_id)
    if not step:
        return False
        
    condition = step.completion_condition
    
    # Define completion conditions
    conditions = {
        'talk_to_companion': lambda: player_data.get('talked_to_companion', False),
        'view_traits': lambda: player_data.get('viewed_traits', False),
        'perform_help_action': lambda: player_data.get('stats', {}).get('help_actions', 0) > 0,
        'view_karma': lambda: player_data.get('viewed_karma', False),
        'complete_quest': lambda: player_data.get('stats', {}).get('quests_completed', 0) > 0,
        'complete_combat_training': lambda: player_data.get('completed_combat_training', False),
        'visit_guild_hall': lambda: player_data.get('visited_guild_hall', False),
        'visit_marketplace': lambda: player_data.get('visited_marketplace', False),
        'auto_complete': lambda: True
    }
    
    validation_func = conditions.get(condition)
    if not validation_func:
        return False
        
    return validation_func()


# Import tutorial_steps from tutorial.py to avoid circular import
from .tutorial import tutorial_steps

__all__ = [
    'get_tutorial_step',
    'get_all_steps',
    'get_step_count',
    'validate_completion',
    'tutorial_steps'
]
