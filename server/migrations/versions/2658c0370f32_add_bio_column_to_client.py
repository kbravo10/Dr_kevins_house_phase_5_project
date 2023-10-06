"""add bio column to client

Revision ID: 2658c0370f32
Revises: 844e0bda89ec
Create Date: 2023-10-06 00:16:03.682644

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2658c0370f32'
down_revision = '844e0bda89ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bio', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('clients', schema=None) as batch_op:
        batch_op.drop_column('bio')

    # ### end Alembic commands ###
